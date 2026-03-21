import { wpRequest } from "./client";

interface InquiryData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    source?: "contact_form" | "lead_capture";
    service?: string;
}

interface InquiryResponse {
    success: boolean;
    message?: string;
}

// Submit contact inquiry via custom WordPress endpoint
export async function submitInquiry(
    data: InquiryData
): Promise<InquiryResponse> {
    const response = await wpRequest<InquiryResponse>(
        "/astroeshop/v1/inquiry",
        {
            method: "POST",
            body: JSON.stringify({
                customer_name: data.name,
                customer_email: data.email,
                customer_phone: data.phone || "",
                inquiry_subject: data.subject,
                inquiry_message: data.message,
                inquiry_source: data.source || "contact_form",
                inquiry_service: data.service || "",
                inquiry_status: "new",
                inquiry_timestamp: new Date().toISOString(),
            }),
        }
    );

    if (response.success && response.data?.success) {
        return { success: true };
    }

    return {
        success: false,
        message: response.error || "Failed to send message",
    };
}
