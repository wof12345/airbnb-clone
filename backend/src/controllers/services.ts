import { Request, Response } from "express";
import Service, { IService } from "../models/service";

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
      guest_type,
      min_guest,
      max_guest,
      service_types,
    } = req.query;

    const filter: any = {};

    if (start_date && end_date) {
      filter.start_date = { $gte: new Date(start_date as string) };
      filter.end_date = { $lte: new Date(end_date as string) };
    }

    if (date) {
      filter.start_date = { $lte: new Date(date as string) };
      filter.end_date = { $gte: new Date(date as string) };
    }

    if (type) filter.type = type;

    if (country) filter.country = country;
    if (city) filter.city = city;

    if (language) filter.language = language;

    if (guest_type || min_guest || max_guest) {
      filter.guests = {
        $elemMatch: {
          ...(guest_type ? { type: guest_type } : {}),
          ...(min_guest ? { amount: { $gte: Number(min_guest) } } : {}),
          ...(max_guest ? { amount: { $lte: Number(max_guest) } } : {}),
        },
      };
    }

    if (service_types) {
      const types = (service_types as string).split(",");
      filter.service_type = { $in: types };
    }

    const services: IService[] = await Service.find(filter);

    let grouped: Record<string, IService[]> = {};

    if (type === "home" || type === "experience") {
      grouped = services.reduce((acc: Record<string, IService[]>, service) => {
        const key = service.country;
        if (!acc[key]) acc[key] = [];
        acc[key].push(service);
        return acc;
      }, {});
    } else {
      services.forEach((service) => {
        service.service_type.forEach((st) => {
          if (!grouped[st]) grouped[st] = [];
          grouped[st].push(service);
        });
      });
    }

    res.json(grouped);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const serviceData: Partial<IService> = req.body;
    const service: IService = await Service.create(serviceData);
    res.status(201).json(service);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getServiceById = async (
  req: Request,
  res: Response
): Promise<void> => {
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
