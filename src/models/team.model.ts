import { Schema, model, type InferSchemaType } from 'mongoose'

const teamSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    short_name: { type: String, required: true },
    code: { type: Number, required: true },
    pulse_id: { type: Number, required: true },

    position: { type: Number, required: true },
    played: { type: Number, required: true },
    win: { type: Number, required: true },
    draw: { type: Number, required: true },
    loss: { type: Number, required: true },
    points: { type: Number, required: true },

    strength: { type: Number, required: true },
    strength_overall_home: { type: Number, required: true },
    strength_overall_away: { type: Number, required: true },

    strength_attack_home: { type: Number, required: true },
    strength_attack_away: { type: Number, required: true },

    strength_defence_home: { type: Number, required: true },
    strength_defence_away: { type: Number, required: true },

    form: { type: String, default: null },
    team_division: { type: String, default: null },
    unavailable: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

teamSchema.index({ id: 1 }, { unique: true })
teamSchema.index({ name: 1 })
teamSchema.index({ short_name: 1 })

export type Team = InferSchemaType<typeof teamSchema>

export const TeamModel = model<Team>('Team', teamSchema)
