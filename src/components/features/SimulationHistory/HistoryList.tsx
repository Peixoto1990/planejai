import type { SimulationRecord } from '@/data/simulation';
import { HistoryCard } from './HistoryCard';

interface HistoryListProps {
  data: SimulationRecord[];
  deleteSimulation: (id: string) => void;
}

export function HistoryList({ data, deleteSimulation }: HistoryListProps) {
  if (!data || data.length === 0) {
    return <p>Sem dados de histórico para exibir. Faça uma simulação.</p>;
  }

  return (
    <ul className="flex gap-4 flex-col">
      {data.map((data) => (
        <li key={data.id}>
          <HistoryCard data={data} deleteSimulation={deleteSimulation} />
        </li>
      ))}
    </ul>
  );
}
