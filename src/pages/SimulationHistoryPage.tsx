import { HistoryList } from '@/components/features/SimulationHistory/HistoryList';
import { PageHero } from '@/components/shared/PageHero';
import type { SimulationRecord } from '@/data/simulation';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { useState } from 'react';

export function SimulationHistoryPage() {
  const { getAllData, removeSimulation } = useSimulationStorage();
  const [data, setData] = useState<SimulationRecord[]>(getAllData());
  function deleteSimulation(id: string) {
    setData(removeSimulation(id));
  }

  return (
    <main className="mx-auto w-[90%] max-w-5xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de Simulações"
        subtitle="Com base no seu perfil financeiro e objetivos"
      />
      <HistoryList data={data} deleteSimulation={deleteSimulation} />
    </main>
  );
}
