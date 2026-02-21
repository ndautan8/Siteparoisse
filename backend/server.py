from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')

# ============ MODELS ============

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminResponse(BaseModel):
    token: str
    username: str

class NewsCreate(BaseModel):
    title: str
    content: str
    category: Optional[str] = "Actualité"
    image_url: Optional[str] = None

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    published: Optional[bool] = None

class News(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    content: str
    category: str
    image_url: Optional[str] = None
    published: bool = True
    created_at: str

class MassTimeCreate(BaseModel):
    day: str
    time: str
    location: str
    mass_type: Optional[str] = "Messe"

class MassTimeUpdate(BaseModel):
    day: Optional[str] = None
    time: Optional[str] = None
    location: Optional[str] = None
    mass_type: Optional[str] = None

class MassTime(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    day: str
    time: str
    location: str
    mass_type: str

# ============ AUTH HELPERS ============

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=24)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm="HS256")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ============ ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "Notre Dame d'Autan API"}

# AUTH
@api_router.post("/auth/login", response_model=AdminResponse)
async def login(credentials: AdminLogin):
    admin = await db.admins.find_one({"username": credentials.username}, {"_id": 0})
    if not admin or not verify_password(credentials.password, admin['password_hash']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": credentials.username})
    return AdminResponse(token=token, username=credentials.username)

# NEWS
@api_router.get("/news", response_model=List[News])
async def get_news(published_only: bool = False):
    query = {"published": True} if published_only else {}
    news_list = await db.news.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return news_list

@api_router.post("/news", response_model=News)
async def create_news(news: NewsCreate, username: str = Depends(get_current_user)):
    news_dict = news.model_dump()
    news_obj = News(
        id=str(uuid.uuid4()),
        **news_dict,
        created_at=datetime.now(timezone.utc).isoformat()
    )
    doc = news_obj.model_dump()
    await db.news.insert_one(doc)
    return news_obj

@api_router.put("/news/{news_id}", response_model=News)
async def update_news(news_id: str, news_update: NewsUpdate, username: str = Depends(get_current_user)):
    existing = await db.news.find_one({"id": news_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="News not found")
    
    update_data = {k: v for k, v in news_update.model_dump().items() if v is not None}
    if update_data:
        await db.news.update_one({"id": news_id}, {"$set": update_data})
    
    updated = await db.news.find_one({"id": news_id}, {"_id": 0})
    return News(**updated)

@api_router.delete("/news/{news_id}")
async def delete_news(news_id: str, username: str = Depends(get_current_user)):
    result = await db.news.delete_one({"id": news_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="News not found")
    return {"message": "News deleted"}

# MASS TIMES
@api_router.get("/mass-times", response_model=List[MassTime])
async def get_mass_times():
    times = await db.mass_times.find({}, {"_id": 0}).to_list(100)
    return times

@api_router.post("/mass-times", response_model=MassTime)
async def create_mass_time(mass_time: MassTimeCreate, username: str = Depends(get_current_user)):
    mass_dict = mass_time.model_dump()
    mass_obj = MassTime(id=str(uuid.uuid4()), **mass_dict)
    doc = mass_obj.model_dump()
    await db.mass_times.insert_one(doc)
    return mass_obj

@api_router.put("/mass-times/{mass_id}", response_model=MassTime)
async def update_mass_time(mass_id: str, mass_update: MassTimeUpdate, username: str = Depends(get_current_user)):
    existing = await db.mass_times.find_one({"id": mass_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Mass time not found")
    
    update_data = {k: v for k, v in mass_update.model_dump().items() if v is not None}
    if update_data:
        await db.mass_times.update_one({"id": mass_id}, {"$set": update_data})
    
    updated = await db.mass_times.find_one({"id": mass_id}, {"_id": 0})
    return MassTime(**updated)

@api_router.delete("/mass-times/{mass_id}")
async def delete_mass_time(mass_id: str, username: str = Depends(get_current_user)):
    result = await db.mass_times.delete_one({"id": mass_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Mass time not found")
    return {"message": "Mass time deleted"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()