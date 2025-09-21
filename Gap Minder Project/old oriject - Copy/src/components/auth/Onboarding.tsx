import { useState } from 'react';
import { WelcomeSignUp } from './WelcomeSignUp';
import { SkillsInterests } from './SkillsInterests';
import { AcademicDetails } from './AcademicDetails';
import type { UserProfile } from '../../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState<Partial<UserProfile>>({});

  const handleWelcomeComplete = (data: { name: string; college: string; course: string; year: string }) => {
    setProfileData({ ...profileData, ...data });
    setStep(2);
  };

  const handleSkillsComplete = (data: {
    domain: string;
    currentSkills: string[];
    desiredSkills: string[];
    interests: string[];
    desiredRole: string;
    careerGoals: string[];
  }) => {
    setProfileData({ ...profileData, ...data });
    setStep(3);
  };

  const handleAcademicComplete = (data: {
    currentSubjects: { name: string; credits: number }[];
    timetable: { day: string; classes: { subject: string; time: string }[] }[];
    learningPreferences: string[];
  }) => {
    const completeProfile: UserProfile = {
      ...profileData,
      ...data,
      level: 'beginner', // Default level, can be updated later
      completedTasks: [],
      watchedVideos: [],
      quizScores: [],
      connections: [],
      groups: []
    } as UserProfile;

    onComplete(completeProfile);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  switch (step) {
    case 1:
      return <WelcomeSignUp onNext={handleWelcomeComplete} />;
    case 2:
      return <SkillsInterests onNext={handleSkillsComplete} onBack={handleBack} />;
    case 3:
      return <AcademicDetails onComplete={handleAcademicComplete} onBack={handleBack} />;
    default:
      return <WelcomeSignUp onNext={handleWelcomeComplete} />;
  }
}