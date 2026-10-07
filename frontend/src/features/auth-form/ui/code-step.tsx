'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from 'cn';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ArrowLeftIcon, ArrowRightIcon, Loader2Icon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { requestSmsCode, verifySmsCode } from '@shared/api';
import { Button } from '@shared/ui/button';
import { Field, FieldError, FieldLabel } from '@shared/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@shared/ui/input-otp';

import { CODE_LENGTH, type CodeFormValues, codeFormSchema } from '../model/schema';
import { submitButtonClassName, textButtonClassName } from './class-names';

const RESEND_DELAY_SECONDS = 30;

type CodeStepProps = {
  phone: string;
  onBack: () => void;
  onVerified: () => void;
};

export function CodeStep({ phone, onBack, onVerified }: CodeStepProps) {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_DELAY_SECONDS);
  const form = useForm<CodeFormValues>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: { code: '' },
  });
  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (secondsLeft === 0) {
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const onSubmit = async ({ code }: CodeFormValues) => {
    const { isValid } = await verifySmsCode(code);
    if (!isValid) {
      form.setError('code', { message: 'Неверный код' });
      return;
    }
    onVerified();
  };

  const resendCode = async () => {
    await requestSmsCode(phone);
    toast.success('Отправили код ещё раз');
    setSecondsLeft(RESEND_DELAY_SECONDS);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-8"
    >
      <div>
        <h2 className="text-sm font-semibold uppercase">Код из SMS</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Отправили на номер{' '}
          <span className="whitespace-nowrap text-foreground tabular-nums">
            {phone}
          </span>
        </p>
      </div>

      <Controller
        name="code"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="auth-code" className="sr-only">
              Код из SMS
            </FieldLabel>
            <InputOTP
              id="auth-code"
              maxLength={CODE_LENGTH}
              pattern={REGEXP_ONLY_DIGITS}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              onComplete={() => form.handleSubmit(onSubmit)()}
              autoComplete="one-time-code"
              autoFocus
              disabled={isSubmitting}
              aria-invalid={fieldState.invalid}
            >
              <InputOTPGroup className="w-full rounded-none has-aria-invalid:ring-0">
                {Array.from({ length: CODE_LENGTH }, (_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    aria-invalid={fieldState.invalid}
                    className="h-16 flex-1 font-mono text-2xl first:rounded-none last:rounded-none data-[active=true]:bg-muted data-[active=true]:ring-0 sm:h-18 dark:bg-transparent dark:data-[active=true]:bg-muted"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className={submitButtonClassName}
      >
        {isSubmitting ? (
          <>
            <Loader2Icon data-icon="inline-start" className="animate-spin" />
            Проверяем
          </>
        ) : (
          <>
            Войти
            <ArrowRightIcon data-icon="inline-end" />
          </>
        )}
      </Button>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="link"
          onClick={onBack}
          className={textButtonClassName}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Изменить номер
        </Button>
        {secondsLeft > 0 ? (
          <span className="mono-label text-muted-foreground tabular-nums">
            Повторно через 0:{String(secondsLeft).padStart(2, '0')}
          </span>
        ) : (
          <Button
            type="button"
            variant="link"
            onClick={resendCode}
            className={cn(textButtonClassName, 'text-foreground')}
          >
            Отправить ещё раз
          </Button>
        )}
      </div>
    </form>
  );
}
