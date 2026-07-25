import { useTheme } from '@/hooks/useTheme';
import { Clock, Moon, Sun, TrendingUp, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Divider } from './Divider';

export function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-(--border) px-3 py-3">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-9 items-center justify-center rounded-full">
            <Wallet size={20} className="text-primary-foreground" />
          </div>
          <span className="text-lg">
            <span className="text-muted-foreground font-medium">Planej</span>
            <span className="font-extrabold">.ai</span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            title="Nova Simulação"
            variant="secondary"
            icon={TrendingUp}
            onClick={() => navigate('/')}
          >
            <span className="hidden sm:inline">Nova Simulação</span>
          </Button>
          <Button
            title="Histórico"
            variant="ghost"
            icon={Clock}
            onClick={() => navigate('/historico')}
          >
            <span className="hidden sm:inline">Histórico</span>
          </Button>
          <Divider orientation="vertical" />
          <Button
            title="Tema"
            variant="ghost"
            icon={theme === 'light' ? Moon : Sun}
            onClick={toggleTheme}
          >
            <span className="hidden sm:inline">{theme === 'light' ? 'Escuro' : 'Claro'}</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
