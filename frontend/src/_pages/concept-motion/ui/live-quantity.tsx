import { Minus, Plus } from 'lucide-react';

import { MAX_PORTIONS } from '../model/selection';
import { changeQuantity } from '../model/use-selection';

export function LiveQuantity({
  id,
  name,
  quantity,
}: {
  id: string;
  name: string;
  quantity: number;
}) {
  return (
    <div className="wow-quantity" role="group" aria-label={`Количество: ${name}`}>
      <button
        type="button"
        aria-label={`Уменьшить: ${name}`}
        disabled={quantity <= 0}
        onClick={() => changeQuantity(id, -1)}
      >
        <Minus size={16} aria-hidden />
      </button>
      <output aria-label={`Порций: ${name}`} key={quantity}>
        {quantity}
      </output>
      <button
        type="button"
        aria-label={`Увеличить: ${name}`}
        disabled={quantity >= MAX_PORTIONS}
        onClick={() => changeQuantity(id, 1)}
      >
        <Plus size={16} aria-hidden />
      </button>
    </div>
  );
}
