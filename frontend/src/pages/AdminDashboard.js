import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Newspaper, Clock, Cross, Calendar, Mail, Upload, Copy, X, FileText } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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

  // Mass Times Form State
  const [massForm, setMassForm] = useState({ day: '', time: '', location: '', mass_type: 'Messe' });
  const [editingMass, setEditingMass] = useState(null);

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
      if (editingNews) {
        await axios.put(
          `${BACKEND_URL}/api/news/${editingNews.id}`,
          newsForm,
          { headers: getAuthHeaders() }
        );
        toast.success('Actualité mise à jour');
      } else {
        await axios.post(`${BACKEND_URL}/api/news`, newsForm, { headers: getAuthHeaders() });
        toast.success('Actualité créée');
      }
      setNewsForm({ title: '', content: '', category: 'Actualité', image_url: '' });
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

  // MASS TIMES HANDLERS
  const handleMassSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMass) {
        await axios.put(
          `${BACKEND_URL}/api/mass-times/${editingMass.id}`,
          massForm,
          { headers: getAuthHeaders() }
        );
        toast.success('Horaire mis à jour');
      } else {
        await axios.post(`${BACKEND_URL}/api/mass-times`, massForm, { headers: getAuthHeaders() });
        toast.success('Horaire créé');
      }
      setMassForm({ day: '', time: '', location: '', mass_type: 'Messe' });
      setEditingMass(null);
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleEditMass = (item) => {
    setEditingMass(item);
    setMassForm({ day: item.day, time: item.time, location: item.location, mass_type: item.mass_type });
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
                    <input
                      type="text"
                      value={newsForm.category}
                      onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      data-testid="news-category-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">URL Image (optionnel)</label>
                    <input
                      type="url"
                      value={newsForm.image_url}
                      onChange={(e) => setNewsForm({ ...newsForm, image_url: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      data-testid="news-image-input"
                    />
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
                    <label className="block text-sm font-medium text-slate-700 mb-2">Jour</label>
                    <input
                      type="text"
                      value={massForm.day}
                      onChange={(e) => setMassForm({ ...massForm, day: e.target.value })}
                      placeholder="ex: Dimanche"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      required
                      data-testid="mass-day-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Heure</label>
                    <input
                      type="text"
                      value={massForm.time}
                      onChange={(e) => setMassForm({ ...massForm, time: e.target.value })}
                      placeholder="ex: 10h30"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      required
                      data-testid="mass-time-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Lieu</label>
                    <input
                      type="text"
                      value={massForm.location}
                      onChange={(e) => setMassForm({ ...massForm, location: e.target.value })}
                      placeholder="ex: Église Notre-Dame"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      required
                      data-testid="mass-location-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                    <input
                      type="text"
                      value={massForm.mass_type}
                      onChange={(e) => setMassForm({ ...massForm, mass_type: e.target.value })}
                      placeholder="ex: Messe, Vêpres"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      data-testid="mass-type-input"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    data-testid="mass-submit-button"
                  >
                    {editingMass ? 'Mettre à jour' : 'Ajouter'}
                  </button>
                  {editingMass && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMass(null);
                        setMassForm({ day: '', time: '', location: '', mass_type: 'Messe' });
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
                      <h4 className="font-medium text-slate-900">{item.day} - {item.time}</h4>
                      <p className="text-sm text-slate-600">{item.location} • {item.mass_type}</p>
                    </div>
                    <div className="flex space-x-2">
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
                    <input
                      type="text"
                      required
                      value={funeralForm.location}
                      onChange={(e) => setFuneralForm({ ...funeralForm, location: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Église Saint-Orens"
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
                    <input
                      type="text"
                      required
                      value={eventForm.location}
                      onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      placeholder="Ex: Église de Castanet"
                      data-testid="event-location-input"
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contenu *</label>
                  <textarea
                    required
                    value={letterForm.content}
                    onChange={(e) => setLetterForm({ ...letterForm, content: e.target.value })}
                    rows="10"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                    placeholder="Chers paroissiens..."
                    data-testid="letter-content-input"
                  ></textarea>
                </div>
                <div className="flex space-x-4 pt-2">
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
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
                        setLetterForm({ title: '', content: '', date: '' });
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
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">{item.content}</p>
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