import type { Profile } from '@prisma/client'

import {
  profiles,
  profile,
  createProfile,
  updateProfile,
  deleteProfile,
} from './profiles'
import type { StandardScenario } from './profiles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('profiles', () => {
  scenario('returns all profiles', async (scenario: StandardScenario) => {
    const result = await profiles()

    expect(result.length).toEqual(Object.keys(scenario.profile).length)
  })

  scenario('returns a single profile', async (scenario: StandardScenario) => {
    const result = await profile({ id: scenario.profile.one.id })

    expect(result).toEqual(scenario.profile.one)
  })

  scenario('creates a profile', async (scenario: StandardScenario) => {
    const result = await createProfile({
      input: {
        profileId: scenario.profile.two.profileId,
        importedData: { foo: 'bar' },
      },
    })

    expect(result.profileId).toEqual(scenario.profile.two.profileId)
    expect(result.importedData).toEqual({ foo: 'bar' })
  })

  scenario('updates a profile', async (scenario: StandardScenario) => {
    const original = (await profile({ id: scenario.profile.one.id })) as Profile
    const result = await updateProfile({
      id: original.id,
      input: { importedData: { foo: 'baz' } },
    })

    expect(result.importedData).toEqual({ foo: 'baz' })
  })

  scenario('deletes a profile', async (scenario: StandardScenario) => {
    const original = (await deleteProfile({
      id: scenario.profile.one.id,
    })) as Profile
    const result = await profile({ id: original.id })

    expect(result).toEqual(null)
  })
})
