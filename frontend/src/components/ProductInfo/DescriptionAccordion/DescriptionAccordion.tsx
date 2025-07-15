import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function DescriptionAccordion({ description }: { description: string }) {
    return (
        <Accordion type="single" collapsible className="w-full mt-6">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-md font-medium uppercase">Descripcion del Producto</AccordionTrigger>
                <AccordionContent>
                    {description}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}