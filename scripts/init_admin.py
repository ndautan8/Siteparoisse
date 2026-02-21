#!/usr/bin/env python3
"""Script to initialize admin user in MongoDB"""

import os
import sys
from pathlib import Path
import bcrypt
from pymongo import MongoClient

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent.parent / 'backend'))

from dotenv import load_dotenv
load_dotenv(Path(__file__).parent.parent / 'backend' / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

client = MongoClient(mongo_url)
db = client[db_name]

# Create admin user
username = "admin"
password = "admin123"  # Change this in production!

# Hash password
password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Check if admin exists
existing = db.admins.find_one({"username": username})
if existing:
    print(f"Admin user '{username}' already exists")
else:
    db.admins.insert_one({
        "username": username,
        "password_hash": password_hash
    })
    print(f"✓ Admin user created: {username} / {password}")

# Add sample mass times
if db.mass_times.count_documents({}) == 0:
    sample_masses = [
        {"id": "1", "day": "Dimanche", "time": "10h30", "location": "Église Notre-Dame", "mass_type": "Messe"},
        {"id": "2", "day": "Samedi", "time": "18h30", "location": "Église Notre-Dame", "mass_type": "Messe anticipée"},
    ]
    db.mass_times.insert_many(sample_masses)
    print("✓ Sample mass times added")

# Add sample news
if db.news.count_documents({}) == 0:
    from datetime import datetime, timezone
    sample_news = [
        {
            "id": "1",
            "title": "Bienvenue sur notre nouveau site !",
            "content": "Nous sommes heureux de vous accueillir sur notre site web rénové. Vous y trouverez toutes les informations sur la vie de notre paroisse.",
            "category": "Actualité",
            "image_url": "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800",
            "published": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "2",
            "title": "Préparation de Pâques",
            "content": "Les inscriptions pour les célébrations de Pâques sont ouvertes. N'hésitez pas à vous manifester au secrétariat.",
            "category": "Liturgie",
            "image_url": "",
            "published": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    db.news.insert_many(sample_news)
    print("✓ Sample news added")

print("\n✓ Database initialization complete!")
print(f"Admin login: {username} / {password}")
