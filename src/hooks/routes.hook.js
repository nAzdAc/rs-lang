import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { SettingsPage } from '../pages/SettingsPage'
import { GamesPage } from '../pages/GamesPage'
import { SprintPage } from '../pages/SprintPage'
import { StatsPage } from '../pages/StatsPage'
import { MatchPage } from '../pages/MatchPage'
import { AudioPage } from '../pages/AudioPage'
import { SignInPage } from '../pages/SignInPage'
import { SignUpPage } from '../pages/SignUpPage'
import { SavannaPage } from '../pages/SavannaPage'
import { MainPage } from '../pages/MainPage'
import { LevelPage } from '../pages/LevelPage'
import { DictionaryPage } from '../pages/DictionaryPage'
import { frontRoutes } from '../utils/frontRoutes'

export const useRoutes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <MainPage />
            </Route>
            <Route path={frontRoutes.book}>
                <LevelPage />
            </Route>
            <Route path={frontRoutes.games}>
                <GamesPage />
            </Route>
            <Route path={frontRoutes.savanna}>
                <SavannaPage />
            </Route>
            <Route path={frontRoutes.audio}>
                <AudioPage />
            </Route>
            <Route path={frontRoutes.sprint}>
                <SprintPage />
            </Route>
            <Route path={frontRoutes.match}>
                <MatchPage />
            </Route>
            <Route path={frontRoutes.dictionary}>
                <DictionaryPage />
            </Route>
            <Route path={frontRoutes.stats}>
                <StatsPage />
            </Route>
            <Route path={frontRoutes.settings}>
                <SettingsPage />
            </Route>
            <Route path={frontRoutes.signIn}>
                <SignInPage />
            </Route>
            <Route path={frontRoutes.signUp}>
                <SignUpPage />
            </Route>
        </Switch>
    )
}
