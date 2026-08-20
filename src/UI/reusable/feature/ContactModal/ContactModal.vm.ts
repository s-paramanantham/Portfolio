import { useState } from 'react';
import { ContactServiceInterface } from '../../../../services/ContactService/ContactService.interface';
import { ServiceFactory } from '../../../../services/ServiceFactory';
import { Formatters } from '../../../../helpers/Formatters';
import {
  ContactMessagePayloadBo,
  ContactValidationErrorsBo,
} from '../../../../services/ContactService/bo/ContactMessage.bo';
import { Logger } from '../../../../helpers/Logger';

export interface UseContactModalViewModelProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly contactService?: ContactServiceInterface;
}

export interface UseContactModalViewModelReturn {
  readonly formData: ContactMessagePayloadBo;
  readonly errors: ContactValidationErrorsBo;
  readonly isSubmitting: boolean;
  readonly isSuccess: boolean;
  readonly statusMessage: string | null;
  readonly handleFieldChange: (field: keyof ContactMessagePayloadBo, value: string) => void;
  readonly handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  readonly resetForm: () => void;
}

export const useContactModalViewModel = (
  props: UseContactModalViewModelProps
): UseContactModalViewModelReturn => {
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
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!Formatters.isValidEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof ContactMessagePayloadBo, value: string): void => {
    setFormData((prev: ContactMessagePayloadBo) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev: ContactValidationErrorsBo) => ({
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
      Logger.info('Contact message sent successfully');
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setStatusMessage(errorMessage);
      Logger.error('Contact message submission error', err);
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
    handleFieldChange,
    handleSubmit,
    resetForm,
  };
};
