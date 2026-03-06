import Link from "next/link";

export const metadata = {
    title: "Best Omegle Alternative – Random Anonymous Chat | LazySpace",
    description:
        "Looking for an Omegle alternative? LazySpace lets you talk to strangers instantly through random anonymous chat. No signup required. Just start chatting.",
};

export default function OmegleAlternative() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold mb-6">
                The Best Omegle Alternative for Random Anonymous Chat
            </h1>

            <p className="text-lg text-neutral-400 mb-12 leading-relaxed">
                If you are looking for an alternative to Omegle, LazySpace offers a
                simple way to talk to strangers online. You can{" "}
                <Link href="/chat" className="text-white underline">
                    start chatting instantly
                </Link>{" "}
                without creating an account or sharing personal information.
            </p>

            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        Why People Look for Omegle Alternatives
                    </h2>

                    <p className="text-neutral-400 leading-relaxed">
                        Omegle was once one of the most popular platforms for random
                        conversations with strangers. After its shutdown, many users began
                        searching for new platforms where they could meet new people and
                        chat anonymously.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        What Makes LazySpace Different
                    </h2>

                    <p className="text-neutral-400 leading-relaxed">
                        LazySpace focuses on simplicity and instant connections. Instead of
                        complicated signups or profiles, you are matched with another user
                        immediately and can begin chatting right away. If you're curious
                        about the matching process, you can learn more on our{" "}
                        <Link href="/how-it-works" className="text-white underline">
                            how it works
                        </Link>{" "}
                        page.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        Key Features
                    </h2>

                    <ul className="text-neutral-400 space-y-2 list-disc list-inside">
                        <li>Random anonymous chat with strangers</li>
                        <li>No signup or account required</li>
                        <li>Instant matching with online users</li>
                        <li>Skip to the next conversation anytime</li>
                        <li>Report users to keep the community safe</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        Talk to Strangers Instantly
                    </h2>

                    <p className="text-neutral-400 leading-relaxed">
                        With LazySpace, conversations start instantly. Once you join, the
                        system pairs you with another online user for a private anonymous
                        chat. You can{" "}
                        <Link href="/chat" className="text-white underline">
                            start a random chat
                        </Link>{" "}
                        right away and meet someone new within seconds.
                    </p>
                </section>
            </div>

            <div className="mt-24 text-center">
                <h3 className="text-2xl font-semibold mb-4">
                    Start Chatting with Strangers Now
                </h3>

                <p className="text-neutral-400 mb-8">
                    Jump into LazySpace and get matched with someone instantly.
                </p>

                <Link
                    href="/chat"
                    className="inline-block px-8 py-4 bg-white text-black rounded-lg font-medium hover:scale-105 transition"
                >
                    Start Random Chat
                </Link>
            </div>
        </main>
    );
}