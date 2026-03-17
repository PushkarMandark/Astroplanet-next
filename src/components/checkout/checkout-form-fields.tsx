import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckoutFormData } from "@/lib/validations/checkout";

interface CheckoutFormFieldsProps {
    register: UseFormRegister<CheckoutFormData>;
    errors: FieldErrors<CheckoutFormData>;
}

export function CheckoutFormFields({
    register,
    errors,
}: CheckoutFormFieldsProps) {
    return (
        <Card className="py-4">
            <CardHeader>
                <CardTitle>Billing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                            id="firstName"
                            {...register("firstName")}
                            className={errors.firstName ? "border-destructive" : ""}
                        />
                        {errors.firstName && (
                            <p className="text-sm text-destructive">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                            id="lastName"
                            {...register("lastName")}
                            className={errors.lastName ? "border-destructive" : ""}
                        />
                        {errors.lastName && (
                            <p className="text-sm text-destructive">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                            id="phone"
                            type="tel"
                            {...register("phone")}
                            className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                            <p className="text-sm text-destructive">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                        id="address"
                        {...register("address")}
                        className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                        <p className="text-sm text-destructive">
                            {errors.address.message}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                            id="city"
                            {...register("city")}
                            className={errors.city ? "border-destructive" : ""}
                        />
                        {errors.city && (
                            <p className="text-sm text-destructive">
                                {errors.city.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                            id="state"
                            {...register("state")}
                            className={errors.state ? "border-destructive" : ""}
                        />
                        {errors.state && (
                            <p className="text-sm text-destructive">
                                {errors.state.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="postcode">Postcode *</Label>
                        <Input
                            id="postcode"
                            {...register("postcode")}
                            className={errors.postcode ? "border-destructive" : ""}
                        />
                        {errors.postcode && (
                            <p className="text-sm text-destructive">
                                {errors.postcode.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                        id="notes"
                        {...register("notes")}
                        placeholder="Any special instructions..."
                        rows={3}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
