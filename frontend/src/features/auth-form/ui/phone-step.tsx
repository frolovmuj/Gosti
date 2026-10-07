'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon, Loader2Icon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { requestSmsCode } from '@shared/api';
import { Button } from '@shared/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@shared/ui/field';
import { Input } from '@shared/ui/input';

import { formatPhone } from '../lib/format-phone';
import { CODE_LENGTH, type PhoneFormValues, phoneFormSchema } from '../model/schema';
import { fieldLabelClassName, submitButtonClassName } from './class-names';

type PhoneStepProps = {
  defaultPhone: string;
  onCodeSent: (phone: string) => void;
};

export function PhoneStep({ defaultPhone, onCodeSent }: PhoneStepProps) {
  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { phone: defaultPhone },
  });
  const { isSubmitting } = form.formState;

  const onSubmit = async ({ phone }: PhoneFormValues) => {
    await requestSmsCode(phone);
    toast.success('Код отправлен', {
      description: `Демо-режим: подойдёт любой код из ${CODE_LENGTH} цифр`,
    });
    onCodeSent(phone);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-6">
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="auth-phone" className={fieldLabelClassName}>
                Номер телефона
              </FieldLabel>
              <Input
                {...field}
                onChange={(event) => field.onChange(formatPhone(event.target.value))}
                id="auth-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7 999 123-45-67"
                aria-invalid={fieldState.invalid}
                className="h-14 rounded-none px-4 font-mono text-lg tabular-nums md:text-lg dark:bg-transparent"
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : (
                <FieldDescription className="text-xs">
                  Пришлём SMS с кодом для входа
                </FieldDescription>
              )}
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
              Отправляем код
            </>
          ) : (
            <>
              Получить код
              <ArrowRightIcon data-icon="inline-end" />
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
