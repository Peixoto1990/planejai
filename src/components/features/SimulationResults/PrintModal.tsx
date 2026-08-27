import { Button } from '@/components/shared/Button';
import { useInsight } from '@/hooks/useInsight';
import { Content } from '../Insights/Content';

interface PrintModalProps {
  simulationId: string;
  hiddenModal: () => void;
}

export function PrintModal({ simulationId, hiddenModal }: PrintModalProps) {
  const { insight } = useInsight(simulationId);
  if (!insight)
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed z-20 left-0 top-0 bg-card w-full h-screen grid place-items-center"
      >
        <div className="w-full max-w-175 flex flex-col justify-center gap-4">
          <span className="text-muted-foreground text-3xl">
            Não foi possível carregar os dados. Tente novamente.
          </span>
          <Button className="w-max" onClick={() => hiddenModal()} variant="secondary">
            Voltar
          </Button>
        </div>
      </div>
    );
  const handlePrint = () => {
    const finishPrint = () => {
      hiddenModal();
      window.removeEventListener('afterprint', finishPrint);
    };

    window.addEventListener('afterprint', finishPrint, { once: true });
    window.print();
  };
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed z-20 w-full h-screen top-0 left-0 bg-card overflow-auto p-4"
    >
      <div className="w-full max-w-5xl m-auto">
        <h2 className="sm:text-4xl text-foreground font-semibold mb-4">Resultado da Simulação</h2>
        <Content insight={insight} variant="print" />
        <div className="flex gap-2 justify-center mt-7 print:hidden">
          <Button
            onClick={() => {
              handlePrint();
            }}
            variant="primary"
          >
            Imprimir
          </Button>
          <Button onClick={() => hiddenModal()} variant="secondary">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
