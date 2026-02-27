import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Newspaper, Clock, Cross, Calendar, Mail, Upload, Copy, X, FileText, Repeat } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { format, addWeeks, addMonths, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import LocationAutocomplete from '@/components/LocationAutocomplete';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [news, setNews] = useState([]);
  const [massTimes, setMassTimes] = useState([]);
  const [funerals, setFunerals] = useState([]);
  const [events, setEvents] = useState([]);
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // News Form State
  const [newsForm, setNewsForm] = useState({ title: '', content: '', category: 'Actualité', image_url: '' });
  const [editingNews, setEditingNews] = useState(null);
  const [customCategory, setCustomCategory] = useState('');

  // Mass Times Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [massForm, setMassForm] = useState({ day: '', time: '10:00', location: '', mass_type: 'Messe', date: todayStr });
  const [editingMass, setEditingMass] = useState(null);
  const [repeatMode, setRepeatMode] = useState('none'); // none, week, 2weeks, month
  const [repeatUntil, setRepeatUntil] = useState('');

  // Funerals Form State
  const [funeralForm, setFuneralForm] = useState({ deceased_name: '', funeral_date: '', funeral_time: '', location: '', ceremony_type: 'Messe de funérailles' });
  const [editingFuneral, setEditingFuneral] = useState(null);

  // Events Form State
  const [eventForm, setEventForm] = useState({ title: '', description: '', date: '', time: '', end_time: '', location: '', category: 'Communauté' });
  const [editingEvent, setEditingEvent] = useState(null);

  // Letters Form State
  const [letterForm, setLetterForm] = useState({ title: '', content: '', date: '', file_url: '' });
  const [editingLetter, setEditingLetter] = useState(null);

  // File upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [dragOverImage, setDragOverImage] = useState(false);
  const [dragOverFile, setDragOverFile] = useState(false);

  const NEWS_CATEGORIES = [
    'Actualité',
    'Liturgie',
    'Communauté',
    'Événement',
    'Annonce',
    'Vie paroissiale',
    'Solidarité',
    'Formation',
  ];

  const uploadFile = async (file, type = 'image') => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post(`${BACKEND_URL}/api/upload`, formData, {
      headers: { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' },
    });
    return res.data.file_url;
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowed.includes(file.type)) {
      toast.error('Format non supporté. Utilisez JPG, PNG, GIF ou WebP.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image trop volumineuse (max 10 Mo)');
      return;
    }
    setUploadingImage(true);
    try {
      const url = await uploadFile(file, 'image');
      setNewsForm(prev => ({ ...prev, image_url: url }));
      toast.success('Image uploadée');
    } catch (err) {
      toast.error("Erreur lors de l'upload de l'image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleLetterFileUpload = async (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      toast.error('Seuls les fichiers PDF sont acceptés.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Fichier trop volumineux (max 10 Mo)');
      return;
    }
    setUploadingFile(true);
    try {
      const url = await uploadFile(file, 'pdf');
      setLetterForm(prev => ({ ...prev, file_url: url }));
      toast.success('Fichier PDF uploadé');
    } catch (err) {
      toast.error("Erreur lors de l'upload du fichier");
    } finally {
      setUploadingFile(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [newsRes, massRes, funeralsRes, eventsRes, lettersRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/news`),
        axios.get(`${BACKEND_URL}/api/mass-times`),
        axios.get(`${BACKEND_URL}/api/funerals`),
        axios.get(`${BACKEND_URL}/api/events?include_past=true`),
        axios.get(`${BACKEND_URL}/api/letters`),
      ]);
      setNews(newsRes.data);
      setMassTimes(massRes.data);
      setFunerals(funeralsRes.data);
      setEvents(eventsRes.data);
      setLetters(lettersRes.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    navigate('/admin/login');
  };

  // NEWS HANDLERS
  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newsForm };
      if (payload.category === 'Autre' && customCategory.trim()) {
        payload.category = customCategory.trim();
      }
      if (editingNews) {
        await axios.put(
          `${BACKEND_URL}/api/news/${editingNews.id}`,
          payload,
          { headers: getAuthHeaders() }
        );
        toast.success('Actualité mise à jour');
      } else {
        await axios.post(`${BACKEND_URL}/api/news`, payload, { headers: getAuthHeaders() });
        toast.success('Actualité créée');
      }
      setNewsForm({ title: '', content: '', category: 'Actualité', image_url: '' });
      setCustomCategory('');
      setEditingNews(null);
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleEditNews = (item) => {
    setEditingNews(item);
    setNewsForm({ title: item.title, content: item.content, category: item.category, image_url: item.image_url || '' });
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Supprimer cette actualité ?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/news/${id}`, { headers: getAuthHeaders() });
      toast.success('Actualité supprimée');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // Helper: get French day name from date string
  const getDayName = (dateStr) => {
    if (!dateStr) return '';
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const d = new Date(dateStr + 'T00:00:00');
    return days[d.getDay()];
  };

  // MASS TIMES HANDLERS
  const handleMassSubmit = async (e) => {
    e.preventDefault();
    try {
      const dayName = getDayName(massForm.date) || massForm.day;
      const basePayload = { ...massForm, day: dayName };

      if (editingMass) {
        await axios.put(
          `${BACKEND_URL}/api/mass-times/${editingMass.id}`,
          basePayload,
          { headers: getAuthHeaders() }
        );
        toast.success('Horaire mis à jour');
      } else if (repeatMode !== 'none' && repeatUntil && massForm.date) {
        // Generate repeated entries
        const items = [];
        let currentDate = new Date(massForm.date + 'T00:00:00');
        const endDate = new Date(repeatUntil + 'T00:00:00');
        const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

        while (currentDate <= endDate) {
          const dateStr = currentDate.toISOString().split('T')[0];
          items.push({
            day: days[currentDate.getDay()],
            time: massForm.time,
            location: massForm.location,
            mass_type: massForm.mass_type,
            date: dateStr,
          });
          if (repeatMode === 'week') currentDate = addWeeks(currentDate, 1);
          else if (repeatMode === '2weeks') currentDate = addWeeks(currentDate, 2);
          else if (repeatMode === 'month') currentDate = addMonths(currentDate, 1);
          else break;
        }

        await axios.post(`${BACKEND_URL}/api/mass-times/bulk`, { items }, { headers: getAuthHeaders() });
        toast.success(`${items.length} horaires créés`);
      } else {
        await axios.post(`${BACKEND_URL}/api/mass-times`, basePayload, { headers: getAuthHeaders() });
        toast.success('Horaire créé');
      }
      setMassForm({ day: '', time: '10:00', location: '', mass_type: 'Messe', date: todayStr });
      setEditingMass(null);
      setRepeatMode('none');
      setRepeatUntil('');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleEditMass = (item) => {
    setEditingMass(item);
    setMassForm({ day: item.day, time: item.time, location: item.location, mass_type: item.mass_type, date: item.date || '' });
  };

  const handleDuplicateMass = (item) => {
    setEditingMass(null);
    setMassForm({ day: item.day, time: item.time, location: item.location, mass_type: item.mass_type, date: item.date || todayStr });
    toast.info('Horaire dupliqué — modifiez et cliquez "Ajouter"');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteMass = async (id) => {
    if (!window.confirm('Supprimer cet horaire ?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/mass-times/${id}`, { headers: getAuthHeaders() });
      toast.success('Horaire supprimé');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // FUNERALS CRUD
  const handleSubmitFuneral = async (e) => {
    e.preventDefault();
    try {
      if (editingFuneral) {
        await axios.put(`${BACKEND_URL}/api/funerals/${editingFuneral.id}`, funeralForm, { headers: getAuthHeaders() });
        toast.success('Funérailles modifiées');
        setEditingFuneral(null);
      } else {
        await axios.post(`${BACKEND_URL}/api/funerals`, funeralForm, { headers: getAuthHeaders() });
        toast.success('Funérailles ajoutées');
      }
      setFuneralForm({ deceased_name: '', funeral_date: '', funeral_time: '', location: '', ceremony_type: 'Messe de funérailles' });
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleEditFuneral = (funeral) => {
    setEditingFuneral(funeral);
    setFuneralForm({
      deceased_name: funeral.deceased_name,
      funeral_date: funeral.funeral_date,
      funeral_time: funeral.funeral_time,
      location: funeral.location,
      ceremony_type: funeral.ceremony_type
    });
  };

  const handleDeleteFuneral = async (id) => {
    if (!window.confirm('Supprimer cette cérémonie ?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/funerals/${id}`, { headers: getAuthHeaders() });
      toast.success('Funérailles supprimées');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // EVENTS HANDLERS
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...eventForm };
    if (!payload.end_time) delete payload.end_time;
    try {
      if (editingEvent) {
        await axios.put(`${BACKEND_URL}/api/events/${editingEvent.id}`, payload, { headers: getAuthHeaders() });
        toast.success('Événement mis à jour');
        setEditingEvent(null);
      } else {
        await axios.post(`${BACKEND_URL}/api/events`, payload, { headers: getAuthHeaders() });
        toast.success('Événement créé');
      }
      setEventForm({ title: '', description: '', date: '', time: '', end_time: '', location: '', category: 'Communauté' });
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleEditEvent = (item) => {
    setEditingEvent(item);
    setEventForm({
      title: item.title,
      description: item.description || '',
      date: item.date,
      time: item.time,
      end_time: item.end_time || '',
      location: item.location,
      category: item.category,
    });
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Supprimer cet événement ?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/events/${id}`, { headers: getAuthHeaders() });
      toast.success('Événement supprimé');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // LETTERS HANDLERS
  const handleLetterSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...letterForm };
      if (!payload.file_url) delete payload.file_url;
      if (!payload.content) payload.content = '';
      if (editingLetter) {
        await axios.put(`${BACKEND_URL}/api/letters/${editingLetter.id}`, payload, { headers: getAuthHeaders() });
        toast.success('Lettre mise à jour');
        setEditingLetter(null);
      } else {
        await axios.post(`${BACKEND_URL}/api/letters`, payload, { headers: getAuthHeaders() });
        toast.success('Lettre publiée');
      }
      setLetterForm({ title: '', content: '', date: '', file_url: '' });
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleEditLetter = (item) => {
    setEditingLetter(item);
    setLetterForm({ title: item.title, content: item.content || '', date: item.date, file_url: item.file_url || '' });
  };

  const handleDeleteLetter = async (id) => {
    if (!window.confirm('Supprimer cette lettre ?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/letters/${id}`, { headers: getAuthHeaders() });
      toast.success('Lettre supprimée');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy à HH:mm', { locale: fr });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-paper" data-testid="admin-dashboard">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl text-slate-deep">Administration</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-slate-600 hover:text-gold transition-colors"
            data-testid="logout-button"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('news')}
            className={`pb-4 px-4 font-medium transition-colors flex items-center space-x-2 ${
              activeTab === 'news' ? 'text-gold border-b-2 border-gold' : 'text-slate-600 hover:text-slate-900'
            }`}
            data-testid="tab-news"
          >
            <Newspaper className="w-5 h-5" />
            <span>Actualités</span>
          </button>
          <button
            onClick={() => setActiveTab('mass')}
            className={`pb-4 px-4 font-medium transition-colors flex items-center space-x-2 ${
              activeTab === 'mass' ? 'text-gold border-b-2 border-gold' : 'text-slate-600 hover:text-slate-900'
            }`}
            data-testid="tab-mass-times"
          >
            <Clock className="w-5 h-5" />
            <span>Horaires des messes</span>
          </button>
          <button
            onClick={() => setActiveTab('funerals')}
            className={`pb-4 px-4 font-medium transition-colors flex items-center space-x-2 ${
              activeTab === 'funerals' ? 'text-gold border-b-2 border-gold' : 'text-slate-600 hover:text-slate-900'
            }`}
            data-testid="tab-funerals"
          >
            <Cross className="w-5 h-5" />
            <span>Funérailles</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-4 px-4 font-medium transition-colors flex items-center space-x-2 ${
              activeTab === 'events' ? 'text-gold border-b-2 border-gold' : 'text-slate-600 hover:text-slate-900'
            }`}
            data-testid="tab-events"
          >
            <Calendar className="w-5 h-5" />
            <span>Événements</span>
          </button>
          <button
            onClick={() => setActiveTab('letters')}
            className={`pb-4 px-4 font-medium transition-colors flex items-center space-x-2 ${
              activeTab === 'letters' ? 'text-gold border-b-2 border-gold' : 'text-slate-600 hover:text-slate-900'
            }`}
            data-testid="tab-letters"
          >
            <Mail className="w-5 h-5" />
            <span>Lettres</span>
          </button>
        </div>

        {/* NEWS TAB */}
        {activeTab === 'news' && (
          <div className="space-y-8">
            {/* Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-serif text-2xl text-slate-deep mb-6">
                {editingNews ? 'Éditer l\'actualité' : 'Nouvelle actualité'}
              </h2>
              <form onSubmit={handleNewsSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Titre</label>
                  <input
                    type="text"
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                    required
                    data-testid="news-title-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contenu</label>
                  <textarea
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                    required
                    data-testid="news-content-input"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
                    <select
                      value={NEWS_CATEGORIES.includes(newsForm.category) ? newsForm.category : 'Autre'}
                      onChange={(e) => {
                        if (e.target.value === 'Autre') {
                          setNewsForm({ ...newsForm, category: 'Autre' });
                          setCustomCategory('');
                        } else {
                          setNewsForm({ ...newsForm, category: e.target.value });
                          setCustomCategory('');
                        }
                      }}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold bg-white"
                      data-testid="news-category-input"
                    >
                      {NEWS_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="Autre">Autre...</option>
                    </select>
                    {(newsForm.category === 'Autre' || !NEWS_CATEGORIES.includes(newsForm.category)) && (
                      <input
                        type="text"
                        value={customCategory || (newsForm.category !== 'Autre' ? newsForm.category : '')}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Tapez votre catégorie..."
                        className="w-full mt-2 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                        required
                        data-testid="news-custom-category-input"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Image (optionnel)</label>
                    {newsForm.image_url ? (
                      <div className="relative border border-slate-200 rounded-lg overflow-hidden">
                        <img src={newsForm.image_url.startsWith('/api') ? `${BACKEND_URL}${newsForm.image_url}` : newsForm.image_url} alt="Preview" className="w-full h-32 object-cover" />
                        <button
                          type="button"
                          onClick={() => setNewsForm({ ...newsForm, image_url: '' })}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                          dragOverImage ? 'border-gold bg-gold/5' : 'border-slate-200 hover:border-gold/50'
                        }`}
                        onDragOver={(e) => { e.preventDefault(); setDragOverImage(true); }}
                        onDragLeave={() => setDragOverImage(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOverImage(false);
                          const file = e.dataTransfer.files[0];
                          if (file) handleImageUpload(file);
                        }}
                        onClick={() => document.getElementById('news-image-file').click()}
                      >
                        {uploadingImage ? (
                          <div className="flex items-center justify-center gap-2 text-gold">
                            <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm">Upload en cours...</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                            <p className="text-sm text-slate-500">Glissez une image ou <span className="text-gold font-medium">parcourir</span></p>
                            <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP — max 10 Mo</p>
                          </>
                        )}
                        <input
                          id="news-image-file"
                          type="file"
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleImageUpload(file);
                            e.target.value = '';
                          }}
                          data-testid="news-image-input"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    data-testid="news-submit-button"
                  >
                    {editingNews ? 'Mettre à jour' : 'Publier'}
                  </button>
                  {editingNews && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNews(null);
                        setNewsForm({ title: '', content: '', category: 'Actualité', image_url: '' });
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
                      data-testid="news-cancel-button"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* News List */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-slate-deep">Actualités publiées</h3>
              {loading ? (
                <p>Chargement...</p>
              ) : news.length === 0 ? (
                <p className="text-slate-500">Aucune actualité</p>
              ) : (
                news.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-4 border border-slate-100 flex justify-between items-start"
                    data-testid={`news-item-${item.id}`}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">{item.content}</p>
                      <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <span>{formatDate(item.created_at)}</span>
                        <span>•</span>
                        <span className="text-gold">{item.category}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditNews(item)}
                        className="text-slate-600 hover:text-gold transition-colors"
                        data-testid={`news-edit-${item.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="text-slate-600 hover:text-red-600 transition-colors"
                        data-testid={`news-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* MASS TIMES TAB */}
        {activeTab === 'mass' && (
          <div className="space-y-8">
            {/* Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-serif text-2xl text-slate-deep mb-6">
                {editingMass ? 'Éditer l\'horaire' : 'Nouvel horaire'}
              </h2>
              <form onSubmit={handleMassSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={massForm.date || ''}
                      onChange={(e) => setMassForm({ ...massForm, date: e.target.value, day: getDayName(e.target.value) })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      required
                      data-testid="mass-date-input"
                    />
                    {massForm.date && (
                      <p className="text-xs text-gold mt-1 font-medium">{getDayName(massForm.date)}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Heure</label>
                    <input
                      type="time"
                      value={massForm.time}
                      onChange={(e) => setMassForm({ ...massForm, time: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      required
                      data-testid="mass-time-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Lieu</label>
                    <LocationAutocomplete
                      value={massForm.location}
                      onChange={(val) => setMassForm({ ...massForm, location: val })}
                      placeholder="Tapez pour rechercher une église..."
                      required
                      testId="mass-location-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                    <select
                      value={massForm.mass_type}
                      onChange={(e) => setMassForm({ ...massForm, mass_type: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold bg-white"
                      data-testid="mass-type-input"
                    >
                      <option value="Messe">Messe</option>
                      <option value="Messe anticipée">Messe anticipée</option>
                      <option value="Vêpres">Vêpres</option>
                      <option value="Adoration">Adoration</option>
                      <option value="Confession">Confession</option>
                      <option value="Laudes">Laudes</option>
                      <option value="Chapelet">Chapelet</option>
                    </select>
                  </div>
                </div>

                {/* Repeat section - only when creating */}
                {!editingMass && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Repeat className="w-4 h-4 text-slate-600" />
                      <label className="text-sm font-medium text-slate-700">Répéter cet horaire</label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Fréquence</label>
                        <select
                          value={repeatMode}
                          onChange={(e) => setRepeatMode(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold bg-white text-sm"
                        >
                          <option value="none">Pas de répétition</option>
                          <option value="week">Toutes les semaines</option>
                          <option value="2weeks">Toutes les 2 semaines</option>
                          <option value="month">Tous les mois</option>
                        </select>
                      </div>
                      {repeatMode !== 'none' && (
                        <div>
                          <label className="block text-xs text-slate-500 mb-1">Jusqu'au</label>
                          <input
                            type="date"
                            value={repeatUntil}
                            onChange={(e) => setRepeatUntil(e.target.value)}
                            min={massForm.date}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold text-sm"
                            required={repeatMode !== 'none'}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    data-testid="mass-submit-button"
                  >
                    {editingMass ? 'Mettre à jour' : (repeatMode !== 'none' ? 'Créer la série' : 'Ajouter')}
                  </button>
                  {editingMass && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMass(null);
                        setMassForm({ day: '', time: '10:00', location: '', mass_type: 'Messe', date: todayStr });
                        setRepeatMode('none');
                        setRepeatUntil('');
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
                      data-testid="mass-cancel-button"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Mass Times List */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-slate-deep">Horaires configurés</h3>
              {loading ? (
                <p>Chargement...</p>
              ) : massTimes.length === 0 ? (
                <p className="text-slate-500">Aucun horaire</p>
              ) : (
                massTimes.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-4 border border-slate-100 flex justify-between items-center"
                    data-testid={`mass-item-${item.id}`}
                  >
                    <div>
                      <h4 className="font-medium text-slate-900">
                        {item.day} - {item.time}
                        {item.date && <span className="text-slate-400 text-sm ml-2">({new Date(item.date + 'T00:00:00').toLocaleDateString('fr-FR')})</span>}
                      </h4>
                      <p className="text-sm text-slate-600">{item.location} • {item.mass_type}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDuplicateMass(item)}
                        className="text-slate-600 hover:text-emerald-600 transition-colors"
                        title="Dupliquer"
                        data-testid={`mass-duplicate-${item.id}`}
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditMass(item)}
                        className="text-slate-600 hover:text-gold transition-colors"
                        data-testid={`mass-edit-${item.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMass(item.id)}
                        className="text-slate-600 hover:text-red-600 transition-colors"
                        data-testid={`mass-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* FUNERALS TAB */}
        {activeTab === 'funerals' && (
          <div className="space-y-8">
            {/* Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-serif text-xl text-slate-deep mb-6">
                {editingFuneral ? 'Modifier la cérémonie' : 'Ajouter une cérémonie'}
              </h3>
              <form onSubmit={handleSubmitFuneral} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nom du défunt *</label>
                    <input
                      type="text"
                      required
                      value={funeralForm.deceased_name}
                      onChange={(e) => setFuneralForm({ ...funeralForm, deceased_name: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="M. Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Lieu *</label>
                    <LocationAutocomplete
                      value={funeralForm.location}
                      onChange={(val) => setFuneralForm({ ...funeralForm, location: val })}
                      placeholder="Tapez pour rechercher une église..."
                      required
                      testId="funeral-location-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={funeralForm.funeral_date}
                      onChange={(e) => setFuneralForm({ ...funeralForm, funeral_date: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Heure *</label>
                    <input
                      type="time"
                      required
                      value={funeralForm.funeral_time}
                      onChange={(e) => setFuneralForm({ ...funeralForm, funeral_time: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Type de cérémonie</label>
                    <select
                      value={funeralForm.ceremony_type}
                      onChange={(e) => setFuneralForm({ ...funeralForm, ceremony_type: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    >
                      <option value="Messe de funérailles">Messe de funérailles</option>
                      <option value="Célébration de la Parole">Célébration de la Parole</option>
                      <option value="Bénédiction">Bénédiction</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingFuneral ? 'Modifier' : 'Ajouter'}</span>
                  </button>
                  {editingFuneral && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFuneral(null);
                        setFuneralForm({ deceased_name: '', funeral_date: '', funeral_time: '', location: '', ceremony_type: 'Messe de funérailles' });
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Funerals List */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-slate-deep">Cérémonies programmées</h3>
              {loading ? (
                <p>Chargement...</p>
              ) : funerals.length === 0 ? (
                <p className="text-slate-500">Aucune cérémonie</p>
              ) : (
                funerals.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-4 border border-slate-100 flex justify-between items-center"
                    data-testid={`funeral-item-${item.id}`}
                  >
                    <div>
                      <h4 className="font-medium text-slate-900">{item.deceased_name}</h4>
                      <p className="text-sm text-slate-600">
                        {new Date(item.funeral_date).toLocaleDateString('fr-FR')} à {item.funeral_time} • {item.location}
                      </p>
                      <p className="text-xs text-gold mt-1">{item.ceremony_type}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditFuneral(item)}
                        className="text-slate-600 hover:text-gold transition-colors"
                        data-testid={`funeral-edit-${item.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFuneral(item.id)}
                        className="text-slate-600 hover:text-red-600 transition-colors"
                        data-testid={`funeral-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-serif text-2xl text-slate-deep mb-6">
                {editingEvent ? "Modifier l'événement" : 'Nouvel événement'}
              </h2>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Titre *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                    placeholder="Ex: Messe de Noël"
                    data-testid="event-title-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                    placeholder="Détails de l'événement..."
                    data-testid="event-description-input"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      data-testid="event-date-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Heure de début *</label>
                    <input
                      type="time"
                      required
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      data-testid="event-time-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Heure de fin (optionnel)</label>
                    <input
                      type="time"
                      value={eventForm.end_time}
                      onChange={(e) => setEventForm({ ...eventForm, end_time: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      data-testid="event-end-time-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Lieu *</label>
                    <LocationAutocomplete
                      value={eventForm.location}
                      onChange={(val) => setEventForm({ ...eventForm, location: val })}
                      placeholder="Tapez pour rechercher un lieu..."
                      required
                      testId="event-location-input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
                    <select
                      value={eventForm.category}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      data-testid="event-category-select"
                    >
                      <option value="Liturgie">Liturgie</option>
                      <option value="Communauté">Communauté</option>
                      <option value="Jeunesse">Jeunesse</option>
                      <option value="Solidarité">Solidarité</option>
                      <option value="Formation">Formation</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-4 pt-2">
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    data-testid="event-submit-button"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingEvent ? 'Mettre à jour' : 'Ajouter'}</span>
                  </button>
                  {editingEvent && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEvent(null);
                        setEventForm({ title: '', description: '', date: '', time: '', end_time: '', location: '', category: 'Communauté' });
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
                      data-testid="event-cancel-button"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl text-slate-deep">Tous les événements</h3>
              {loading ? (
                <p>Chargement...</p>
              ) : events.length === 0 ? (
                <p className="text-slate-500">Aucun événement</p>
              ) : (
                events.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-4 border border-slate-100 flex justify-between items-start"
                    data-testid={`event-item-${item.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-slate-900">{item.title}</h4>
                        <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">{item.category}</span>
                      </div>
                      {item.description && <p className="text-sm text-slate-600 mb-1 line-clamp-2">{item.description}</p>}
                      <p className="text-sm text-slate-500">
                        {new Date(item.date + 'T00:00:00').toLocaleDateString('fr-FR')} à {item.time}
                        {item.end_time ? ` - ${item.end_time}` : ''} • {item.location}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditEvent(item)}
                        className="text-slate-600 hover:text-gold transition-colors"
                        data-testid={`event-edit-${item.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(item.id)}
                        className="text-slate-600 hover:text-red-600 transition-colors"
                        data-testid={`event-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* LETTERS TAB */}
        {activeTab === 'letters' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-serif text-2xl text-slate-deep mb-6">
                {editingLetter ? 'Modifier la lettre' : 'Nouvelle lettre'}
              </h2>
              <form onSubmit={handleLetterSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Titre *</label>
                  <input
                    type="text"
                    required
                    value={letterForm.title}
                    onChange={(e) => setLetterForm({ ...letterForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                    placeholder="Ex: Carême 2026 - Lettre aux paroissiens"
                    data-testid="letter-title-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={letterForm.date}
                    onChange={(e) => setLetterForm({ ...letterForm, date: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                    data-testid="letter-date-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Fichier PDF *</label>
                  {letterForm.file_url ? (
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <FileText className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-emerald-800 truncate">Fichier PDF uploadé</p>
                        <a
                          href={letterForm.file_url.startsWith('/api') ? `${BACKEND_URL}${letterForm.file_url}` : letterForm.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-emerald-600 hover:underline"
                        >
                          Voir le fichier
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLetterForm({ ...letterForm, file_url: '' })}
                        className="text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        dragOverFile ? 'border-gold bg-gold/5' : 'border-slate-200 hover:border-gold/50'
                      }`}
                      onDragOver={(e) => { e.preventDefault(); setDragOverFile(true); }}
                      onDragLeave={() => setDragOverFile(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOverFile(false);
                        const file = e.dataTransfer.files[0];
                        if (file) handleLetterFileUpload(file);
                      }}
                      onClick={() => document.getElementById('letter-pdf-file').click()}
                    >
                      {uploadingFile ? (
                        <div className="flex items-center justify-center gap-2 text-gold">
                          <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm">Upload en cours...</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">Glissez un fichier PDF ou <span className="text-gold font-medium">parcourir</span></p>
                          <p className="text-xs text-slate-400 mt-1">PDF uniquement — max 10 Mo</p>
                        </>
                      )}
                      <input
                        id="letter-pdf-file"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) handleLetterFileUpload(file);
                          e.target.value = '';
                        }}
                        data-testid="letter-file-input"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description (optionnel)</label>
                  <textarea
                    value={letterForm.content}
                    onChange={(e) => setLetterForm({ ...letterForm, content: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                    placeholder="Brève description de la lettre..."
                    data-testid="letter-content-input"
                  ></textarea>
                </div>
                <div className="flex space-x-4 pt-2">
                  <button
                    type="submit"
                    disabled={!letterForm.file_url}
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="letter-submit-button"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingLetter ? 'Mettre à jour' : 'Publier'}</span>
                  </button>
                  {editingLetter && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingLetter(null);
                        setLetterForm({ title: '', content: '', date: '', file_url: '' });
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
                      data-testid="letter-cancel-button"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl text-slate-deep">Lettres publiées</h3>
              {loading ? (
                <p>Chargement...</p>
              ) : letters.length === 0 ? (
                <p className="text-slate-500">Aucune lettre publiée</p>
              ) : (
                letters.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-4 border border-slate-100 flex justify-between items-start"
                    data-testid={`letter-item-${item.id}`}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">
                        {new Date(item.date + 'T00:00:00').toLocaleDateString('fr-FR')}
                      </p>
                      {item.file_url && (
                        <a
                          href={item.file_url.startsWith('/api') ? `${BACKEND_URL}${item.file_url}` : item.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-dark mt-1"
                        >
                          <FileText className="w-3 h-3" />
                          Voir le PDF
                        </a>
                      )}
                      {item.content && <p className="text-sm text-slate-600 mt-1 line-clamp-2">{item.content}</p>}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditLetter(item)}
                        className="text-slate-600 hover:text-gold transition-colors"
                        data-testid={`letter-edit-${item.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLetter(item.id)}
                        className="text-slate-600 hover:text-red-600 transition-colors"
                        data-testid={`letter-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;