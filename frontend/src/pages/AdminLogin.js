import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        username,
        password,
      });
      
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_username', response.data.username);
      toast.success('Connexion réussie');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4" data-testid="admin-login-page">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-slate-deep mb-2">Administration</h1>
          <p className="text-slate-600">Connectez-vous pour gérer le contenu</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nom d'utilisateur</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="admin"
                  required
                  data-testid="admin-username-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="••••••••"
                  required
                  data-testid="admin-password-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-dark text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              data-testid="admin-login-button"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;