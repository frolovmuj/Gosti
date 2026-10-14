import { ArrowUpRight, MapPin, Phone } from 'lucide-react';

import { VENUE } from '@entities/venue';
import { LiveReveal } from './live-reveal';

export function LiveContacts() {
  const mapUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(`${VENUE.region}, ${VENUE.city}, ${VENUE.address}`)}`;
  return (
    <section
      id="wow-contacts"
      className="wow-contacts wow-container"
      aria-labelledby="wow-contacts-title"
    >
      <LiveReveal className="wow-section-heading">
        <div>
          <p className="wow-eyebrow">03 / До встречи</p>
          <h2 id="wow-contacts-title">
            Планы на день?
            <br />
            <em>Заглянуть в гости.</em>
          </h2>
        </div>
        <p>
          Павловск,
          <br />
          Воронежская область
        </p>
      </LiveReveal>
      <div className="wow-contact-grid">
        <LiveReveal className="wow-address-card">
          <p className="wow-eyebrow">Адрес из проекта</p>
          <h3>
            проспект
            <br />
            Революции, <em>100е</em>
          </h3>
          <a href={mapUrl} target="_blank" rel="noreferrer" className="wow-button">
            <MapPin size={16} aria-hidden /> Найти на карте{' '}
            <ArrowUpRight size={18} aria-hidden />
          </a>
          <span>Откроется поиск адреса в Яндекс Картах</span>
        </LiveReveal>
        <LiveReveal className="wow-contact-information" delay={0.18}>
          <div>
            <p className="wow-eyebrow">Часы из проекта</p>
            <p className="wow-hours">
              8:00 <span>—</span> 20:00
            </p>
            <p className="wow-small-note">
              Дни работы и актуальное расписание нужно уточнить.
            </p>
          </div>
          <div>
            <p className="wow-eyebrow">Связаться с кулинарией</p>
            <a className="wow-contact-phone" href={VENUE.phone.href}>
              {VENUE.phone.label}
              <Phone size={20} aria-hidden />
            </a>
            <a
              className="wow-text-link"
              href={VENUE.vk.href}
              target="_blank"
              rel="noreferrer"
            >
              Страница кулинарии ВКонтакте <ArrowUpRight size={17} aria-hidden />
            </a>
          </div>
        </LiveReveal>
      </div>
      <p className="wow-contact-disclaimer">
        Адрес, телефон и часы приведены из материалов кулинарии «Гости».
        Принадлежность предполагаемому ресторану не подтверждена — перед визитом
        уточните сведения.
      </p>
    </section>
  );
}
