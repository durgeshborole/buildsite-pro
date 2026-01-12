import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  Eye, 
  Trash2,
  MessageSquare,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchInquiries();
    }
  }, [user, isAdmin]);

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load inquiries.',
        variant: 'destructive',
      });
    } else {
      setInquiries(data || []);
    }
    setLoadingData(false);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_inquiries')
      .update({ is_read: true })
      .eq('id', id);

    if (!error) {
      setInquiries(inquiries.map(i => i.id === id ? { ...i, is_read: true } : i));
      toast({ title: 'Marked as read' });
    }
  };

  const deleteInquiry = async (id: string) => {
    const { error } = await supabase
      .from('contact_inquiries')
      .delete()
      .eq('id', id);

    if (!error) {
      setInquiries(inquiries.filter(i => i.id !== id));
      toast({ title: 'Inquiry deleted' });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const unreadCount = inquiries.filter(i => !i.is_read).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Site
            </Button>
            <h1 className="font-display text-xl text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Inquiries</p>
                <p className="text-2xl font-display text-foreground">{inquiries.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive flex items-center justify-center">
                <Mail className="w-6 h-6 text-destructive-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Unread</p>
                <p className="text-2xl font-display text-foreground">{unreadCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Read</p>
                <p className="text-2xl font-display text-foreground">{inquiries.length - unreadCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="bg-card border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="font-display text-xl text-foreground">Contact Inquiries</h2>
          </div>
          
          {loadingData ? (
            <div className="p-8 text-center text-muted-foreground">Loading inquiries...</div>
          ) : inquiries.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No inquiries yet.</div>
          ) : (
            <div className="divide-y divide-border">
              {inquiries.map((inquiry) => (
                <div 
                  key={inquiry.id} 
                  className={`p-6 ${!inquiry.is_read ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                        <User className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{inquiry.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {inquiry.email}
                          </span>
                          {inquiry.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {inquiry.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </span>
                      {!inquiry.is_read && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1">New</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 mb-4">{inquiry.message}</p>
                  
                  <div className="flex gap-2">
                    {!inquiry.is_read && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => markAsRead(inquiry.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Mark as Read
                      </Button>
                    )}
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteInquiry(inquiry.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
