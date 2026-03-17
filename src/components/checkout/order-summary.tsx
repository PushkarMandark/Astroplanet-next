import { Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
    items: {
        id: number;
        name: string;
        price: number;
        quantity: number;
    }[];
    subtotal: number;
    shipping: number;
    total: number;
    isSubmitting: boolean;
}

export function OrderSummary({
    items,
    subtotal,
    shipping,
    total,
    isSubmitting,
}: OrderSummaryProps) {
    return (
        <Card className="sticky top-24 py-4">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span>
                            {item.name} × {item.quantity}
                        </span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                ))}

                <Separator />

                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                        {shipping === 0 ? (
                            <span className="text-green-600">FREE</span>
                        ) : (
                            formatPrice(shipping)
                        )}
                    </span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        "Proceed to Payment"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
