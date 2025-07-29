export const Instructions = () => {
  return (
    <div className="flex flex-col gap-2 items-start bg-emerald-50 p-4 rounded-2xl">
      <span className="text-lg font-semibold">Brief Overview</span>
      <p>Select a token that you wish to sell, and specify an amount</p>
      <p>Then select a token that you wish to buy</p>
      <p>
        You are not allowed to select the same token on both sides of the trade
      </p>
      <p>
        You may use the button in the centre to reverse the direction of your
        trade (if you have selected a token on both sides)
      </p>
    </div>
  );
};
