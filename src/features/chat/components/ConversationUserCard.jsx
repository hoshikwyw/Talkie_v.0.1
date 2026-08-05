import { Avatar } from '@/shared/ui'

const ConversationUserCard = ({ name, avatar }) => (
  <div className="flex flex-col items-center border-b border-muted/15 px-4 py-8">
    <Avatar avatar={avatar} name={name} size={90} online />
    <h2 className="mt-4 font-body text-2xl font-semibold text-content">{name}</h2>
    <span className="mt-1 font-body text-sm text-online">online</span>
  </div>
)

export default ConversationUserCard
