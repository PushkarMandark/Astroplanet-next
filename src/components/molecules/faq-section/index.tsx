"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle, Plus, Minus } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
    question: string;
    answer: string;
    readMoreHref?: string;
    readMoreLabel?: string;
}

export interface FaqSectionProps {
    eyebrow?: string;
    title?: string;
    description: string;
    faqs: FaqItem[];
    /**
     * When true, emits an FAQPage JSON-LD script for SEO. Default: true.
     */
    schema?: boolean;
    /**
     * Number of FAQs visible initially. Remaining FAQs are revealed via a
     * "Show more" toggle. Defaults to showing all FAQs.
     */
    initialVisible?: number;
}

export function FaqSection({
    eyebrow = "FAQs",
    title = "Frequently Asked Questions",
    description,
    faqs,
    schema = true,
    initialVisible,
}: FaqSectionProps) {
    const hasCollapse =
        typeof initialVisible === "number" && initialVisible < faqs.length;
    const [expanded, setExpanded] = useState(false);
    const visibleFaqs = hasCollapse && !expanded
        ? faqs.slice(0, initialVisible)
        : faqs;
    const hiddenCount = hasCollapse ? faqs.length - initialVisible! : 0;
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
            },
        })),
    };

    return (
        <section className="relative py-14 md:py-20 bg-linear-to-b from-white via-background to-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10 md:mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4">
                            <HelpCircle className="h-3.5 w-3.5 text-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">
                                {eyebrow}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                            {title}
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            {description}
                        </p>
                    </div>

                    <Accordion
                        type="single"
                        collapsible
                        className="w-full space-y-3"
                    >
                        {visibleFaqs.map((faq, idx) => (
                            <AccordionItem
                                key={idx}
                                value={`faq-${idx}`}
                                className="group/faq rounded-2xl border border-gray-100 bg-white px-5 md:px-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 data-[state=open]:border-primary/40 data-[state=open]:shadow-lg data-[state=open]:bg-linear-to-br data-[state=open]:from-white data-[state=open]:to-accent/5 data-[state=open]:-translate-y-0.5"
                            >
                                <AccordionTrigger className="cursor-pointer text-left font-semibold text-gray-900 hover:no-underline py-5 gap-4 [&>svg]:hidden">
                                    <span className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                                        <span className="inline-flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold font-heading transition-colors duration-300 group-hover/faq:bg-primary/15 group-data-[state=open]/faq:bg-primary group-data-[state=open]/faq:text-white group-data-[state=open]/faq:shadow-md group-data-[state=open]/faq:shadow-primary/30">
                                            {idx + 1}
                                        </span>
                                        <span className="leading-snug text-sm md:text-base flex-1">
                                            {faq.question}
                                        </span>
                                    </span>
                                    <span
                                        aria-hidden
                                        className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary transition-all duration-300 group-hover/faq:bg-primary/10 group-data-[state=open]/faq:bg-primary group-data-[state=open]/faq:text-white group-data-[state=open]/faq:rotate-180"
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-sm md:text-[15px] text-gray-600 leading-relaxed pl-10 md:pl-12 pr-2 pb-5">
                                    <div className="border-l-2 border-primary/15 pl-4">
                                        {faq.answer}
                                        {faq.readMoreHref && (
                                            <div className="mt-3">
                                                <Link
                                                    href={faq.readMoreHref}
                                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/readmore"
                                                >
                                                    {faq.readMoreLabel ?? "Read more"}
                                                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/readmore:translate-x-0.5" />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {hasCollapse && (
                        <div className="mt-6 flex justify-center">
                            <button
                                type="button"
                                onClick={() => setExpanded((v) => !v)}
                                aria-expanded={expanded}
                                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                            >
                                {expanded ? (
                                    <>
                                        <Minus className="h-4 w-4" />
                                        Show fewer questions
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4" />
                                        View {hiddenCount} more {hiddenCount === 1 ? "question" : "questions"}
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
                />
            )}
        </section>
    );
}
