import { Request, Response } from "express";
import { IService } from "../models/service";
import Service from "../models/service";
import { connectDB } from "../config/db";

export const getServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      start_date,
      end_date,
      date,
      type,
      country,
      city,
      language,
      service_types,
    } = req.query;

    await connectDB();

    const filter: any = {};

    if (start_date && end_date) {
      filter.start_date = { $gte: new Date(start_date as string) };
      filter.end_date = { $lte: new Date(end_date as string) };
    }

    if (date) {
      filter.start_date = { $lte: new Date(date as string) };
      filter.end_date = { $gte: new Date(date as string) };
    }

    if (type) {
      filter.type = type;
    }

    if (country) filter.country = country;
    if (city) filter.city = city;

    if (language) filter.language = language;

    if (req.query.guests) {
      const guestFilters = (req.query.guests as string).split(",");
      filter.guests = {
        $all: guestFilters.map((g) => {
          const [type, range] = g.split(":");
          const [min, max] = range.split("-").map(Number);

          return {
            $elemMatch: {
              type,
              ...(min ? { amount: { $gte: min } } : {}),
              ...(max ? { amount: { $lte: max } } : {}),
            },
          };
        }),
      };
    }

    if (service_types) {
      const types = (service_types as string).split(",");
      filter.service_type = { $all: types };
    }

    const services: IService[] = await Service.find(filter);

    res.json(services);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getServiceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  await connectDB();

  try {
    const { id } = req.params;
    const service: IService | null = await Service.findById(id);
    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    res.json(service);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
