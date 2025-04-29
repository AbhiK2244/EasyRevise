export const calculateNextReviewDate = (intervalDays = 1) => {
    const now = new Date();
    now.setDate(now.getDate() + intervalDays);
    return now;
  };