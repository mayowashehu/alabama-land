const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '2347082151926';

interface ListingParams {
  size?: string;
  estate?: string;
  price?: string;
}

type MessageType = 'general' | 'listing' | 'reserve' | 'blog' | 'pricing' | 'docs';

const MESSAGE_TEMPLATES: Record<MessageType, string | ((params: ListingParams) => string)> = {
  general: "Hi, I found your website and I'm interested in buying land in Sagamu. Can you help me?",
  listing: (params: ListingParams) =>
    `Hi, I'm interested in the ${params.size || '[plot size]'} plot at ${params.estate || '[estate name]'} listed at ${params.price || '[price]'}. Is it still available?`,
  reserve: (params: ListingParams) =>
    `Hi, I'd like to reserve plot ${params.size || '[plot number]'} at ${params.estate || '[estate name]'}. What are the next steps?`,
  blog: "Hi, I read your article on your website and I'd like to know more about buying land in Sagamu.",
  pricing: "Hi, I'd like to know more about your payment plans for land in Sagamu.",
  docs: (params: ListingParams) =>
    `Hi, I'd like to verify the documents for the plot at ${params.estate || '[estate name]'} before making a decision.`,
};

export function getWhatsAppLink(messageType: MessageType, params?: ListingParams): string {
  let message: string;
  const template = MESSAGE_TEMPLATES[messageType];

  if (typeof template === 'function') {
    message = template(params || {});
  } else {
    message = template;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export const whatsappLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const openWhatsApp = (message: string): void => {
  const link = whatsappLink(message);
  window.open(link, '_blank', 'noopener,noreferrer');
};
