"use client";

import React, { memo, useCallback } from "react";

interface FeedbackPromptProps {
  helpfulValue: boolean | null;
  onFeedbackChange: (value: boolean) => void;
  title?: string;
  question?: string;
  containerClassName?: string;
  headingWrapperClassName?: string;
  titleClassName?: string;
  questionClassName?: string;
  buttonGroupClassName?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
  inactiveButtonClassName?: string;
  positiveLabel?: string;
  negativeLabel?: string;
}

const FeedbackPromptComponent: React.FC<FeedbackPromptProps> = ({
  helpfulValue,
  onFeedbackChange,
  title = "Tell us what you think",
  question = "Was this content helpful?",
  containerClassName = "mt-12 pt-8 ",
  headingWrapperClassName = "mb-4",
  titleClassName = "text-xs mb-2 text-preto",
  questionClassName = "text-2xl font-thin text-preto mb-4",
  buttonGroupClassName = "flex rounded-lg gap-3",
  buttonClassName = "px-6 py-2 text-sm font-semibold rounded-lg border border-preto transition-colors",
  activeButtonClassName = "bg-preto text-white",
  inactiveButtonClassName = "bg-white text-preto hover:bg-gray-100",
  positiveLabel = "Yes",
  negativeLabel = "Not really",
}) => {
  const handlePositiveClick = useCallback(() => {
    onFeedbackChange(true);
  }, [onFeedbackChange]);

  const handleNegativeClick = useCallback(() => {
    onFeedbackChange(false);
  }, [onFeedbackChange]);

  const buildButtonClass = (isActive: boolean) =>
    `${buttonClassName} ${isActive ? activeButtonClassName : inactiveButtonClassName}`;

  return (
    <div className={containerClassName}>
      <div className={headingWrapperClassName}>
        <p className={titleClassName}>{title}</p>
        <p className={questionClassName}>{question}</p>
      </div>
      <div className={buttonGroupClassName}>
        <button
          onClick={handlePositiveClick}
          className={buildButtonClass(helpfulValue === true)}
        >
          {positiveLabel}
        </button>
        <button
          onClick={handleNegativeClick}
          className={buildButtonClass(helpfulValue === false)}
        >
          {negativeLabel}
        </button>
      </div>
    </div>
  );
};

const FeedbackPrompt = memo(FeedbackPromptComponent);
FeedbackPrompt.displayName = "FeedbackPrompt";

export default FeedbackPrompt;
