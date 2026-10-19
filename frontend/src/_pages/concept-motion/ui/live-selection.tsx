import { ArrowDown, ArrowUpRight, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { MOCK_DISHES } from '@entities/dish';

import { formatPrice } from '@shared/lib/format-price';

import {
  changeQuantity,
  clearSelection,
  useSelection,
} from '../model/use-selection';
import { LiveDialog } from './live-dialog';
import { LiveQuantity } from './live-quantity';

export function LiveSelection({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { quantities, total, count, persisted } = useSelection();
  const selected = MOCK_DISHES.filter((dish) => quantities[dish.id] > 0);
  return (
    <LiveDialog open={open} title="К вашему столу" onClose={onClose} sheet>
      <div className="wow-selection-content">
        <p className="wow-selection-intro">
          Соберите то, что хочется попробовать.
          <br />
          Это предварительный выбор — он никуда не отправляется.
        </p>
        {selected.length ? (
          <>
            <ul className="wow-selection-list">
              {selected.map((dish) => (
                <li key={dish.id} className="wow-selection-row">
                  <Image src={dish.image} alt="" width={76} height={92} />
                  <div className="wow-selection-item">
                    <h3>{dish.name}</h3>
                    <span>
                      {dish.portion} · {formatPrice(dish.price)} за порцию
                    </span>
                    <div>
                      <LiveQuantity
                        id={dish.id}
                        name={dish.name}
                        quantity={quantities[dish.id]}
                      />
                      <strong>
                        {formatPrice(dish.price * quantities[dish.id])}
                      </strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="wow-remove"
                    aria-label={`Убрать: ${dish.name}`}
                    onClick={() => changeQuantity(dish.id, -quantities[dish.id])}
                  >
                    <Trash2 size={16} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
            <div
              className="wow-selection-summary"
              aria-live="polite"
              aria-atomic="true"
            >
              <span>
                Сумма выбора <small>Порций: {count}</small>
              </span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <p className="wow-small-note">
              Цены демонстрационные. Наличие и итоговую стоимость нужно подтвердить у
              заведения.
            </p>
            <a className="wow-button" href="#wow-menu" onClick={onClose}>
              Ещё что-нибудь? <ArrowDown size={18} aria-hidden />
            </a>
            <div className="wow-selection-links">
              <button type="button" onClick={clearSelection}>
                Очистить выбор
              </button>
              <a href="#wow-contacts" onClick={onClose}>
                Контакты <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
          </>
        ) : (
          <div className="wow-empty-selection">
            <div className="wow-plate" aria-hidden>
              <span>
                для чего-то
                <br />
                <em>вкусного</em>
              </span>
            </div>
            <h3>Пока только предвкушение.</h3>
            <p>
              Загляните в меню и добавьте блюда,
              <br />
              которые приглянулись.
            </p>
            <a className="wow-button" href="#wow-menu" onClick={onClose}>
              Выбрать что-нибудь <ArrowDown size={18} aria-hidden />
            </a>
          </div>
        )}
        <p className="wow-storage-note">
          {persisted
            ? 'Выбор сохраняется в этом браузере после перезагрузки.'
            : 'Хранилище браузера недоступно. Выбор сохранится только до перезагрузки.'}
        </p>
      </div>
    </LiveDialog>
  );
}
