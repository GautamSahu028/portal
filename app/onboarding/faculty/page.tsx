import { getCurrentUser } from "@/auth/nextjs/currentUser";
import FacultyOnboardingForm from "@/components/OnBoarding/FacultyOnBoardingForm";
import db from "@/utils/db";
import { User } from "lucide-react";

export default async function FacultyOnboardingPage() {
  const subjects = await db.subject.findMany({
    select: { id: true, name: true, code: true },
  });

  const fullUser = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Faculty Onboarding
          </h1>
          <p className="text-gray-600">Create your academic portal account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <FacultyOnboardingForm
            id={fullUser.id}
            name={fullUser.name}
            email={fullUser.email}
            subjects={subjects}
          />
        </div>
      </div>
    </div>
  );
}
