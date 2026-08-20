import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { ContactServiceInterface } from '../../../../services/ContactService/ContactService.interface';
import { useContactModalViewModel } from './ContactModal.vm';
import { Modal } from '../../base/Modal/Modal';
import { Input } from '../../base/Input/Input';
import { Textarea } from '../../base/Textarea/Textarea';
import { Button } from '../../base/Button/Button';

export interface ContactModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly contactService?: ContactServiceInterface;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  contactService,
}) => {
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    statusMessage,
    handleFieldChange,
    handleSubmit,
    resetForm,
  } = useContactModalViewModel({ isOpen, onClose, contactService });

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} title="Send a Direct Message" maxWidth="lg">
      {isSuccess ? (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-white">Message Sent!</h4>
          <p className="text-sm text-slate-300 max-w-sm">{statusMessage}</p>
          <Button variant="primary" size="sm" onClick={handleModalClose}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            id="modal-contact-name"
            label="Your Name"
            placeholder="e.g. Sarah Connor"
            value={formData.name}
            error={errors.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            disabled={isSubmitting}
            required
          />

          <Input
            id="modal-contact-email"
            label="Your Email"
            type="email"
            placeholder="sarah@example.com"
            value={formData.email}
            error={errors.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            disabled={isSubmitting}
            required
          />

          <Input
            id="modal-contact-subject"
            label="Subject"
            placeholder="Project Collaboration / Engineering Role"
            value={formData.subject}
            error={errors.subject}
            onChange={(e) => handleFieldChange('subject', e.target.value)}
            disabled={isSubmitting}
            required
          />

          <Textarea
            id="modal-contact-message"
            label="Message"
            placeholder="Describe the opportunity or project details..."
            value={formData.message}
            error={errors.message}
            onChange={(e) => handleFieldChange('message', e.target.value)}
            disabled={isSubmitting}
            required
          />

          {statusMessage && !isSuccess && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300">
              {statusMessage}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleModalClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Send Message
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
