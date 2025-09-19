import { create } from "domain";
import { CreatePollRequest, UpdatePollRequest } from "../dto/poll.dto";

export function mapCreatePollRequest(data: CreatePollRequest) {
  return {
    shortId: data.shortId,
    title: data.title,
    description: data.description,
    type: data.type,
    status: data.status,
    options: {
      create: data.options.map((opt) => ({
        label: opt.label,
      })),
    },
  };
}

export function mapUpdatePollRequest(data: UpdatePollRequest) {
  const { options, ...rest } = data;

  const mappedData: any = {
    ...rest,
  };

  if (options) {
    const optionIds = options.filter((opt) => opt.id).map((opt) => opt.id!);

    mappedData.options = {
      upsert: options.map((opt) => ({
        where: { id: opt.id ?? 0 },
        update: {
          label: opt.label,
          voteCount: opt.voteCount ?? 0,
        },
        create: {
          label: opt.label,
          voteCount: opt.voteCount ?? 0,
        },
      })),
      deleteMany: {
        id: {
          notIn: optionIds.length > 0 ? optionIds : [0],
        },
      },
    };
  }

  return mappedData;
}
