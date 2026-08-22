import { Button } from '@/components/shared/Button';
import { Divider } from '@/components/shared/Divider';
import type { SimulationRecord } from '@/data/simulation';
import { calcMonthlySavings } from '@/utils/simulation';
import { GoalIcon, SquareArrowOutUpRight, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoItem } from './InfoItem';

interface DeleteSimulationModalProps {
  setDisplay: () => void;
  deleteSimulation: () => void;
}

function DeleteSimulationModal({ setDisplay, deleteSimulation }: DeleteSimulationModalProps) {
  return (
    <div
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        e.stopPropagation();
        setDisplay();
      }}
      className="w-full fixed h-screen left-0 top-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,.30)]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-75 bg-card flex items-center justify-evenly rounded-2xl p-4"
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setDisplay();
          }}
          variant="ghost"
        >
          Cancelar
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            deleteSimulation();
            setDisplay();
          }}
          variant="secondary"
        >
          Excluir
        </Button>
      </div>
    </div>
  );
}

interface HistoryCardProps {
  data: SimulationRecord;
  deleteSimulation: (id: string) => void;
}

export function HistoryCard({ data, deleteSimulation }: HistoryCardProps) {
  const [isModalDisplay, setIsModalDisplay] = useState(false);
  const [mobileScreen, setMobileScreen] = useState<boolean>(() => {
    return window.innerWidth < 640;
  });
  const monthlySavings = calcMonthlySavings(data);
  const navigate = useNavigate();

  const setDisplay = () => setIsModalDisplay((prev) => !prev);

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
    <>
      <div className="bg-card p-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-1 sm:justify-between rounded-2xl shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
        <div className="p-2 w-min rounded-2xl bg-primary-foreground self-start">
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
              setDisplay();
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
      {isModalDisplay && (
        <DeleteSimulationModal
          setDisplay={setDisplay}
          deleteSimulation={() => deleteSimulation(data.id)}
        />
      )}
    </>
  );
}
