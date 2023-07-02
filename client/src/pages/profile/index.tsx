import VolunteerProfileForm from "@/components/VolunteerProfileForm";
import OperatorProfileForm from "@/components/OperatorProfileForm";
import SettingsLayout from "@/layouts/settings";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProfileForm() {
  const session = useSession();
  const router = useRouter();

  const operator = useQuery({
    queryKey: [`operator/${session.data?.user.id}`],
    queryFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/operator/${session.data?.user.id}`
      ).then((res) => res.json()),
    enabled: !!session.data?.user.id && session.data.user.role === "operator",
  });

  const volunteer = useQuery({
    queryKey: [`volunteer/${session.data?.user.id}`],
    queryFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/volunteer/${session.data?.user.id}`
      ).then((res) => res.json()),
    enabled: !!session.data?.user.id && session.data.user.role === "volunteer",
  });

  const applicant = useQuery({
    queryKey: [`applicant/${session.data?.user.id}`],
    queryFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/applicant/${session.data?.user.id}`
      ).then((res) => res.json()),
    enabled: !!session.data?.user.id && session.data.user.role === "applicant",
  });

  if (session.status === "loading") return null;
  if (!session.data) {
    router.push("/signin");
    return null;
  }

  return (
    <SettingsLayout>
      {!!volunteer.data && session.data.user.role === "volunteer" && (
        <VolunteerProfileForm defaultValues={volunteer.data} />
      )}
      {!!applicant.data && session.data.user.role === "applicant" && (
        <VolunteerProfileForm defaultValues={applicant.data} />
      )}
      {!!operator.data && session.data.user.role === "operator" && (
        <OperatorProfileForm defaultValues={operator.data} />
      )}
    </SettingsLayout>
  );
}
