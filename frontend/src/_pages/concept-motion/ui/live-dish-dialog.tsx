import { Check, Plus } from 'lucide-react';
import Image from 'next/image';

import { DISH_CATEGORY_LABELS, type Dish } from '@entities/dish';

import { formatPrice } from '@shared/lib/format-price';

import { changeQuantity, useSelection } from '../model/use-selection';
import { LiveDialog } from './live-dialog';
import { LiveQuantity } from './live-quantity';

export function LiveDishDialog({
  dish,
  open,
  onClose,
}: {
  dish: Dish | null;
  open: boolean;
  onClose: () => void;
}) {
  const { quantities } = useSelection();
  const quantity = dish ? quantities[dish.id] || 0 : 0;
  return (
    <LiveDialog open={open} title={dish?.name || 'Блюдо'} onClose={onClose}>
      {dish && (
        <div className="wow-detail">
          <figure>
            <div className="wow-detail-photo">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                sizes="(max-width: 767px) 90vw, 440px"
              />
            </div>
            <figcaption>Демонстрационное изображение из проекта</figcaption>
          </figure>
          <div className="wow-detail-copy">
            <p className="wow-eyebrow">
              {DISH_CATEGORY_LABELS[dish.category]} <span aria-hidden> / </span>{' '}
              {dish.portion}
            </p>
            <p className="wow-detail-description">{dish.description}.</p>
            <div className="wow-detail-note">
              <strong>О составе</strong>
              <p>
                Описание иллюстрирует меню. Полный состав и аллергены ещё не
                подтверждены рестораном.
              </p>
            </div>
            <div className="wow-detail-price">
              <strong>{formatPrice(dish.price)}</strong>
              <span>за порцию · {dish.portion}</span>
            </div>
            <div className="wow-detail-action">
              {quantity > 0 ? (
                <>
                  <LiveQuantity id={dish.id} name={dish.name} quantity={quantity} />
                  <span className="wow-added" role="status">
                    <Check size={16} aria-hidden /> В вашем выборе
                  </span>
                </>
              ) : (
                <button
                  type="button"
                  className="wow-button"
                  onClick={() => changeQuantity(dish.id, 1)}
                >
                  Добавить к столу <Plus size={18} aria-hidden />
                </button>
              )}
            </div>
            <p className="wow-small-note">
              Предварительный выбор, не заказ. До 20 порций одного блюда.
            </p>
            <button type="button" className="wow-text-link" onClick={onClose}>
              Продолжить знакомство с меню
            </button>
          </div>
        </div>
      )}
    </LiveDialog>
  );
}
