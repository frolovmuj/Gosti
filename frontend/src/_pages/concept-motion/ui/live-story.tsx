import { ArrowUpRight } from 'lucide-react';

import { LiveReveal } from './live-reveal';
import { LiveTableScene } from './live-table-scene';

export function LiveStory() {
  return (
    <section id="wow-about" className="wow-story" aria-labelledby="wow-story-title">
      <div className="wow-container wow-story-grid">
        <LiveTableScene />
        <LiveReveal className="wow-story-copy" delay={0.18}>
          <p className="wow-eyebrow">02 / Идея места</p>
          <h2 id="wow-story-title">
            Быть в гостях.
            <br />
            <em>Быть собой.</em>
          </h2>
          <p className="wow-story-lead">
            Не обязательно ждать особого случая,
            <br />
            чтобы собраться за одним столом.
          </p>
          <p>
            Таким мы представляем ресторан «Гости»: знакомая еда, неспешный разговор
            и внимание к простым вещам. Место, где встреча важнее повода.
          </p>
          <a href="#wow-menu" className="wow-text-link">
            Начнём с чего-нибудь вкусного <ArrowUpRight size={17} aria-hidden />
          </a>
          <details className="wow-concept-note">
            <summary>О демонстрационной версии</summary>
            <div>
              <p>
                Это предложение по дизайну, а не официальный сайт ресторана. Меню,
                цены и контакты взяты из проекта кулинарии «Гости»; их соответствие
                ресторану в Павловске не подтверждено.
              </p>
              <p>
                Первый экран использует AI-иллюстрацию. Остальные изображения —
                демонстрационные материалы проекта. Реальные интерьер, история,
                услуги и фотографии будут добавлены после согласования с владельцем.
              </p>
              <p>
                Выбор блюд хранится только в вашем браузере. Заказы, платежи,
                бронирования и сообщения отсюда не отправляются.
              </p>
            </div>
          </details>
        </LiveReveal>
      </div>
    </section>
  );
}
