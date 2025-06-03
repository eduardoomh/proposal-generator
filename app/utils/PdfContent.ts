
export function formatPDFContentForPrisma(content: PDFContentI) {
  return {
    title: content.title,
    language: content.language,

    generalText1: content.general.text_1,

    whoWillWorkText1: content.who_will_work.text_1,

    howWeGetStartedText1: content.how_we_get_started.text_1,

    howYouAreBilledText1: content.how_you_are_billed.text_1,
    howYouAreBilledText2: content.how_you_are_billed.text_2,
    howYouAreBilledAlert: content.how_you_are_billed.alert,

    howWeKeepGoingText1: content.how_we_keep_going.text_1,
    howWeKeepGoingAlert: content.how_we_keep_going.alert,

    availabilityText1: content.availability_and_sla.text_1,

    estimatesText1: content.estimates.text_1,
  };
}

export function formatPrismaToPDFContent(prismaContent: any): PDFContentI {
  return {
    id: prismaContent.id,
    title: prismaContent.title,
    language: prismaContent.language,

    general: {
      text_1: prismaContent.generalText1,
    },
    who_will_work: {
      text_1: prismaContent.whoWillWorkText1,
    },
    how_we_get_started: {
      text_1: prismaContent.howWeGetStartedText1,
    },
    how_you_are_billed: {
      text_1: prismaContent.howYouAreBilledText1,
      text_2: prismaContent.howYouAreBilledText2,
      alert: prismaContent.howYouAreBilledAlert,
    },
    how_we_keep_going: {
      text_1: prismaContent.howWeKeepGoingText1,
      alert: prismaContent.howWeKeepGoingAlert,
    },
    availability_and_sla: {
      text_1: prismaContent.availabilityText1,
    },
    estimates: {
      text_1: prismaContent.estimatesText1,
    },
    created_at: prismaContent.createdAt,
  };
}

interface TemplateVariables {
  company_name?: string;
  [key: string]: string | undefined;
}

export function extractParagraphsFromHTML(html: string, vars?: TemplateVariables): string[] {
  const regex = /<p[^>]*>(.*?)<\/p>/gi;
  const paragraphs: string[] = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    let cleanText = match[1]
      .replace(/<br\s*\/?>/gi, '\n') // reemplaza <br> por saltos de línea
      .replace(/<\/?[^>]+(>|$)/g, '') // elimina cualquier otra etiqueta HTML
      .trim();

    // Reemplazar variables dinámicas si están presentes
    if (vars) {
      for (const [key, value] of Object.entries(vars)) {
        if (value) {
          const varPattern = new RegExp(`\\$\\{${key}\\}`, 'g');
          cleanText = cleanText.replace(varPattern, value);
        }
      }
    }

    if (cleanText) {
      paragraphs.push(cleanText + '\n');
    }
  }

  return paragraphs;
}
