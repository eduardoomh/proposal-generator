
interface PDFContentI{
    id: string;
    title: string;
    language: 'es' | 'en';
    general: {
     text_1: string;   
    }
    who_will_work: {
        text_1: string;
    };
    how_we_get_started: {
        text_1: string;
    };
    how_you_are_billed: {
        text_1: string;
        text_2: string;
        alert: string;
    };
    how_we_keep_going: {
        text_1: string;
        alert: string;
    };
    availability_and_sla: {
        text_1: string;
    };
    estimates: {
        text_1: string;
    };
}