'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { EASE_OUT_EXPO, ROUTES } from '@shared/config';
import { FieldSeparator } from '@shared/ui/field';

import { CodeStep } from './code-step';
import { PhoneStep } from './phone-step';
import { YandexIdButton } from './yandex-id-button';

type Step = 'phone' | 'code';

const stepTransition = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
  transition: { duration: 0.5, ease: EASE_OUT_EXPO },
};

export function AuthForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const hasSignedIn = useRef(false);

  // Next.js держит страницу в <Activity> после ухода с неё: после входа
  // сбрасываем шаг, чтобы повторный визит начинался с номера телефона.
  useLayoutEffect(() => {
    return () => {
      if (hasSignedIn.current) {
        hasSignedIn.current = false;
        setStep('phone');
        setPhone('');
      }
    };
  }, []);

  const completeSignIn = (title: string) => {
    toast.success(title, {
      description: 'Демо-режим: настоящая авторизация появится вместе с бекендом',
    });
    hasSignedIn.current = true;
    router.push(ROUTES.home);
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {step === 'phone' ? (
        <motion.div key="phone" {...stepTransition} className="flex flex-col gap-6">
          <PhoneStep
            defaultPhone={phone}
            onCodeSent={(sentTo) => {
              setPhone(sentTo);
              setStep('code');
            }}
          />
          <FieldSeparator className="my-0 mono-label text-[0.6875rem]">
            или
          </FieldSeparator>
          <YandexIdButton
            onSignedIn={() => completeSignIn('Вы вошли через Яндекс ID')}
          />
        </motion.div>
      ) : (
        <motion.div key="code" {...stepTransition}>
          <CodeStep
            phone={phone}
            onBack={() => setStep('phone')}
            onVerified={() => completeSignIn('С возвращением в «Гости»!')}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
