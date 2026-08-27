import { AIInsightsCard } from '@/components/features/SimulationResults/AIInsightCardProps';
import { Card } from '@/components/features/SimulationResults/Card';
import { PrintModal } from '@/components/features/SimulationResults/PrintModal';
import { Button } from '@/components/shared/Button';
import { PageHero } from '@/components/shared/PageHero';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { calcMonthlySavings } from '@/utils/simulation';
import {
  CalendarClock,
  CreditCardIcon,
  Goal,
  Landmark,
  PiggyBank,
  Printer,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function SimulationResultsPage() {
  const { id } = useParams<{ id: string }>();
  const { getFormData } = useSimulationStorage();
  const data = id ? getFormData(id) : null;
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (isPrinting) {
      window.document.documentElement.classList.add('overflow-hidden');
    } else {
      window.document.documentElement.classList.remove('overflow-hidden');
    }
    return () => window.document.documentElement.classList.remove('overflow-hidden');
  }, [isPrinting]);

  if (!data) {
    return <p>Simulação não encontrada.</p>;
  }

  const monthlySavings = calcMonthlySavings(data);

  const togglePrintModal = () => setIsPrinting((prev) => !prev);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="print:hidden">
        <PageHero
          title="Resultado da sua simulação"
          subtitle="Com base no seu perfil financeiro e objetivos."
        />
        <div className={'mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3'}>
          <Card
            icon={Goal}
            label="Custo da Meta"
            value={data.goalAmount}
            subtitle={data.goalName}
          />
          <Card
            icon={CalendarClock}
            label="Prazo"
            value={`${data.goalDeadline} meses`}
            subtitle="Prazo para atingir a meta"
          />
          <Card
            variant="primary"
            icon={PiggyBank}
            label="Economia Mensal"
            value={`R$ ${monthlySavings.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            subtitle="Economia mensal necessária"
          />
        </div>
        <div className={'grid gap-6 lg:grid-cols-3'}>
          <AIInsightsCard simulationId={data.id} />
          <div className={'order-1 flex flex-col gap-6 lg:order-2'}>
            <Card
              icon={Wallet}
              label="Renda Mensal"
              value={data.income}
              subtitle="Renda total bruta mensal"
            />
            <Card
              icon={CreditCardIcon}
              label="Custos Fixos de Vida"
              value={data.expenses}
              subtitle="Gastos essenciais mensais"
            />
            <Card
              icon={Landmark}
              label="Dívidas / Parcelas"
              value={data.debts}
              subtitle="Valor comprometido em parcelas/depósitos"
            />
          </div>
        </div>
        <Button
          type="button"
          aria-label="Imprimir Simulação"
          variant="primary"
          title="Imprimir"
          className="fixed right-2.5 bottom-8 shadow-[0px_0px_5px_1px_rgba(0,0,0,.40)]"
          icon={Printer}
          onClick={() => {
            togglePrintModal();
          }}
        />
      </div>
      {isPrinting && <PrintModal simulationId={data.id} hiddenModal={togglePrintModal} />}
    </main>
  );
}
