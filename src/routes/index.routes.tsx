import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PublicRoutes } from './public.routes';
import { PrivateRoutes } from './private.routes';
import { navigationRef } from '../utils/navigation';
import { SafeAreaView } from 'react-native';
import colors from '../utils/colors';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends Routes { }
    }
}

export type Routes = {
    Login: undefined;
    Profile: undefined;
    VetCases: undefined;
    VideoCamera: undefined;
    SplashScreen: undefined;

    Chat: {
        petName: string;
        videoUri?: string;
        vetCaseId: number;
        clinicFantasyName: string;
    }

    VetCaseDetails: undefined;
    VetCaseAnimal: undefined;
    VetCaseClinic: undefined;
    VetCaseVeterinarian: undefined;
    VetCaseCategory: undefined;
    VetCaseEvidences: undefined;
    VetCaseVeterinarianRecords: undefined;

    WebPage: {
        source: string;
        screenTitle: string;
    };
}

const Route = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
    <NavigationContainer ref={navigationRef}>
        {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
);

export default Route;