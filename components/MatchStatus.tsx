export default function MatchStatus({
    matched
  }: {
    matched: boolean;
  }) {
    return (
      <h2>
        {matched ? "🟢 Connected" : "🔍 Looking for match..."}
      </h2>
    );
  }
  