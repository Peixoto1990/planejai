import { Button } from '@/components/shared/Button';
import { Divider } from '@/components/shared/Divider';
import type { SimulationRecord } from '@/data/simulation';
import { calcMonthlySavings } from '@/utils/simulation';
import { GoalIcon, SquareArrowOutUpRight, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoItem } from './InfoItem';

interface HistoryCardProps {
  data: SimulationRecord;
  deleteSimulation: (id: string) => void;
}

export function HistoryCard({ data, deleteSimulation }: HistoryCardProps) {
  const [mobileScreen, setMobileScreen] = useState<boolean>(() => {
    return window.innerWidth < 640;
  });
  const monthlySavings = calcMonthlySavings(data);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setMobileScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="bg-card p-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-1 sm:justify-between rounded-2xl shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="p-2 w-min rounded-2xl bg-primary-foreground">
        <GoalIcon className="text-primary" size={32} />
      </div>
      <InfoItem
        variant="reverse"
        title={data.goalName}
        value={new Date(data.createdAt).toLocaleDateString('pt-BR')}
      />
      <InfoItem title="Custo da Meta" value={data.goalAmount} />
      <InfoItem title="Prazo" value={`${data.goalDeadline} meses`} />
      <InfoItem
        title="Economia Mensal"
        value={`R$ ${monthlySavings.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
      />
      <Divider spacing={0} orientation={mobileScreen ? 'horizontal' : 'vertical'} />
      <div className="flex self-stretch justify-evenly">
        <Button
          title="Excluir Simulação"
          className="text-red-700"
          icon={Trash2}
          variant="ghost"
          onClick={() => {
            deleteSimulation(data.id);
          }}
        />
        {mobileScreen && <Divider orientation="vertical" />}
        <Button
          icon={SquareArrowOutUpRight}
          variant="secondary"
          onClick={() => navigate(`/resultado/${data.id}`)}
        >
          Ver detalhes
        </Button>
      </div>
    </div>
  );
}
