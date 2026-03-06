export const metadata = {
    title: "How LazySpace Works – Random Anonymous Chat",
    description:
        "Learn how LazySpace connects you with strangers for anonymous conversations. No signup required. Find a match, chat instantly, or move to the next match anytime.",
};

export default function HowItWorks() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold mb-6">
                How LazySpace Works
            </h1>

            <p className="text-lg text-neutral-400 mb-14 leading-relaxed">
                LazySpace lets you talk to strangers instantly through random anonymous
                chat. You don’t need to create an account or share personal information.
                Just join and start chatting.
            </p>

            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        1. Join the Chat
                    </h2>
                    <p className="text-neutral-400 leading-relaxed">
                        Click the start button to enter LazySpace. No signup or login is
                        required. Once you join, the system begins searching for another
                        user who is also looking to chat.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        2. Get Matched with a Random User
                    </h2>
                    <p className="text-neutral-400 leading-relaxed">
                        LazySpace connects you with another person who is currently online.
                        The match is completely random, making every conversation unique
                        and spontaneous.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        3. Start an Anonymous Conversation
                    </h2>
                    <p className="text-neutral-400 leading-relaxed">
                        Once matched, you can begin chatting immediately. Conversations
                        are anonymous and you don’t need to reveal any personal
                        information. Just talk freely and enjoy the interaction.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        4. Find the Next Match Anytime
                    </h2>
                    <p className="text-neutral-400 leading-relaxed">
                        If you want to move on, you can skip the current conversation and
                        instantly get matched with someone new. This keeps the experience
                        dynamic and lets you meet different people quickly.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        5. Report Users if Necessary
                    </h2>
                    <p className="text-neutral-400 leading-relaxed">
                        If someone behaves inappropriately, you can report them. Reports
                        help maintain a safe and respectful environment for everyone using
                        LazySpace.
                    </p>
                </section>
            </div>

            {/* CTA Section */}
            <div className="mt-24 text-center">
                <h3 className="text-2xl font-semibold mb-4">
                    Ready to Talk to Someone New?
                </h3>

                <p className="text-neutral-400 mb-8">
                    Start a random anonymous conversation instantly with LazySpace.
                </p>

                <a
                    href="/chat"
                    className="inline-block px-8 py-4 bg-white text-black rounded-lg font-medium hover:scale-105 transition"
                >
                    Start Random Chat
                </a>
            </div>
        </main>
    );
}