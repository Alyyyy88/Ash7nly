import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateUserProfile } from "@/hooks/user";
import { useNotification } from "@/hooks/useNotification";
import { User, Mail } from "lucide-react";
import { Spinner } from "./ui/spinner";

const UpdateProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().optional().nullable(),
});

type UpdateProfileFormData = z.infer<typeof UpdateProfileSchema>;

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: {
    id: number;
    email: string;
    fullName: string;
    phoneNumber: string | null;
    role: string;
  } | null;
}

export function ProfileModal({
  open,
  onOpenChange,
  profile,
}: ProfileModalProps) {
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();
  const { showSuccess, showError } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileFormData>({
    defaultValues: {
      fullName: profile?.fullName || "",
      phoneNumber: profile?.phoneNumber || "",
    },
    resolver: zodResolver(UpdateProfileSchema),
  });

  const onSubmit = (data: UpdateProfileFormData) => {
    updateProfile(
      {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber || null,
      },
      {
        onSuccess: () => {
          showSuccess("Profile updated successfully");
          reset();
          onOpenChange(false);
        },
        onError: (error) => {
          showError(
            "Failed to update profile",
            error instanceof Error ? error.message : "Something went wrong"
          );
        },
      }
    );
  };

  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Profile Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Display User Info */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#ef4444]" />
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Email
                </label>
                <p className="text-gray-900 font-medium">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-blue-500" />
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Role
                </label>
                <p className="text-gray-900 font-medium">{profile.role}</p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-900 font-semibold">
                Full Name
              </Label>
              <Input
                {...register("fullName")}
                id="fullName"
                placeholder="Enter your full name"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
              {errors.fullName && (
                <p className="text-sm text-red-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-gray-900 font-semibold"
              >
                Phone Number (Optional)
              </Label>
              <Input
                {...register("phoneNumber")}
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
                className="border-gray-300 text-gray-900"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-medium"
              >
                {isPending ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
