import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useVetCase } from "../../context/VetCaseContext";
import { EvidencesType } from "../../schemas/VetCaseDetails";
import { httpClient } from "../../infra/adapters/http-client-adapter"
import { VetCaseService } from "../../infra/services/vet-case-service"

export const useViewModel = () => {
    const { vetCase } = useVetCase();
    const navigation = useNavigation();

    const [evidences, setEvidences] = useState<EvidencesType[]>([]);
    const [isFetchingEvidences, displayFetchFeedback] = useState<boolean>(true);

    async function fetchVetCaseDetails(): Promise<void> {
        try {
            displayFetchFeedback(true)

            const vetCaseService = new VetCaseService(httpClient)
            const response = await vetCaseService.findOne(vetCase.id)

            setEvidences([...response?.chat_evidences, ...response?.evidences])
        }

        finally {
            displayFetchFeedback(false)
        }
    }

    function openEvidenceFile(source: string): void {
        navigation.navigate('WebPage', {
            screenTitle: 'Evidências',
            source: source,
        });
    }

    function isEvidencesNotFoundTextVisible(): boolean {
        return evidences.length === 0 && !isFetchingEvidences;
    }

    function getEvidenceIcon({ type }: { type: string }): string {
        if (type.endsWith('pdf')) {
            return 'file-pdf-box';
        }

        if (type.endsWith('csv') || type.endsWith('xlsx')) {
            return 'file-excel';
        }

        if (type.endsWith('docx')) {
            return 'word';
        }

        if (type.endsWith('mp3')) {
            return 'music'
        }

        if (type.startsWith('video')) {
            return 'video'
        }

        if (type.startsWith('image')) {
            return 'image'
        }

        return 'file'
    }

    return {
        evidences,
        getEvidenceIcon,
        openEvidenceFile,
        fetchVetCaseDetails,
        isFetchingEvidences,
        isEvidencesNotFoundTextVisible: isEvidencesNotFoundTextVisible(),
    }
}