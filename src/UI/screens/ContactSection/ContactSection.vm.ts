import { useState } from 'react';
import { ContactServiceInterface } from '../../../services/ContactService/ContactService.interface';
import { ServiceFactory } from '../../../services/ServiceFactory';
import { Formatters } from '../../../helpers/Formatters';
import {
  ContactMessagePayloadBo,
  ContactValidationErrorsBo,
} from '../../../services/ContactService/bo/ContactMessage.bo';
import { Logger } from '../../../helpers/Logger';
import { config } from '../../../config/Config';

export interface UseContactSectionViewModelProps {
  readonly contactService?: ContactServiceInterface;
}

export interface UseContactSectionViewModelReturn {
  readonly formData: ContactMessagePayloadBo;
  readonly errors: ContactValidationErrorsBo;
  readonly isSubmitting: boolean;
  readonly isSuccess: boolean;
  readonly statusMessage: string | null;
  readonly socialInfo: typeof config.social;
  readonly handleFieldChange: (field: keyof ContactMessagePayloadBo, value: string) => void;
  readonly handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  readonly resetForm: () => void;
}

export const useContactSectionViewModel = (
  props: UseContactSectionViewModelProps = {}
): UseContactSectionViewModelReturn => {
  const { contactService = ServiceFactory.getContactService() } = props;

  const [formData, setFormData] = useState<ContactMessagePayloadBo>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactValidationErrorsBo>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: ContactValidationErrorsBo = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!Formatters.isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    } else if (formData.subject.trim().length < 4) {
      newErrors.subject = 'Subject must be at least 4 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof ContactMessagePayloadBo, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const resetForm = (): void => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setIsSuccess(false);
    setStatusMessage(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      setStatusMessage(null);

      const sanitizedPayload: ContactMessagePayloadBo = {
        name: Formatters.sanitizeString(formData.name),
        email: Formatters.sanitizeString(formData.email),
        subject: Formatters.sanitizeString(formData.subject),
        message: Formatters.sanitizeString(formData.message),
      };

      const result = await contactService.sendMessage(sanitizedPayload);
      setIsSuccess(true);
      setStatusMessage(result.message);
      Logger.info('Direct message submitted successfully');
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setStatusMessage(errorMessage);
      Logger.error('Direct message submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    statusMessage,
    socialInfo: config.social,
    handleFieldChange,
    handleSubmit,
    resetForm,
  };
};
