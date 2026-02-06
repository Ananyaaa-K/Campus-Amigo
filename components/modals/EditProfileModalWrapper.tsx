import { EditProfileModal } from "./EditProfileModal"

interface EditProfileModalWrapperProps {
    currentName: string
    currentRole: string
}

export function EditProfileModalWrapper({ currentName, currentRole }: EditProfileModalWrapperProps) {
    return <EditProfileModal currentName={currentName} currentRole={currentRole} />
}
