import { Router, type IRouter } from "express";
import {
  CreateWardrobeItemBody,
  CreateWardrobeItemResponse,
  DeleteSavedLookParams,
  DeleteSavedLookResponse,
  DeleteWardrobeItemParams,
  DeleteWardrobeItemResponse,
  GenerateOutfitBody,
  GenerateOutfitResponse,
  GetCurrentWeatherResponse,
  GetDashboardResponse,
  GetSavedLooksResponse,
  GetStyleProfileResponse,
  GetTrendingLooksResponse,
  GetWardrobeResponse,
  SaveLookBody,
  SaveLookResponse,
  SendStylistMessageBody,
  SendStylistMessageResponse,
  UpdateStyleProfileBody,
  UpdateStyleProfileResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const imageUrls = {
  creamSweater:
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=720&q=85",
  blackTrousers:
    "https://images.unsplash.com/photo-1506629905607-d9e8cfd8d3d6?auto=format&fit=crop&w=720&q=85",
  whiteSneakers:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=720&q=85",
  beigeBag:
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=720&q=85",
  denimJacket:
    "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=720&q=85",
  blueJeans:
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=720&q=85",
  whiteShirt:
    "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=720&q=85",
  goldEarrings:
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=720&q=85",
};

const weather = {
  city: "Bengaluru",
  temperature: 24,
  condition: "Partly cloudy",
  humidity: 68,
  rainProbability: 20,
};

let wardrobe = [
  {
    id: "wardrobe-1",
    name: "Oatmeal knit sweater",
    category: "Tops",
    color: "Oatmeal",
    style: "Minimal",
    imageUrl: imageUrls.creamSweater,
    wearCount: 8,
    isFavorite: true,
  },
  {
    id: "wardrobe-2",
    name: "Tailored black trousers",
    category: "Bottoms",
    color: "Black",
    style: "Formal",
    imageUrl: imageUrls.blackTrousers,
    wearCount: 12,
    isFavorite: false,
  },
  {
    id: "wardrobe-3",
    name: "Everyday white sneakers",
    category: "Shoes",
    color: "White",
    style: "Casual",
    imageUrl: imageUrls.whiteSneakers,
    wearCount: 18,
    isFavorite: true,
  },
  {
    id: "wardrobe-4",
    name: "Soft structure tote",
    category: "Bags",
    color: "Beige",
    style: "Minimal",
    imageUrl: imageUrls.beigeBag,
    wearCount: 5,
    isFavorite: false,
  },
  {
    id: "wardrobe-5",
    name: "Relaxed denim jacket",
    category: "Jackets",
    color: "Indigo",
    style: "Casual",
    imageUrl: imageUrls.denimJacket,
    wearCount: 7,
    isFavorite: false,
  },
  {
    id: "wardrobe-6",
    name: "Wide-leg blue jeans",
    category: "Bottoms",
    color: "Blue",
    style: "Casual",
    imageUrl: imageUrls.blueJeans,
    wearCount: 10,
    isFavorite: true,
  },
];

let savedLooks = [
  {
    id: "look-1",
    title: "The gallery opening",
    style: "Contemporary",
    imageUrl: imageUrls.whiteShirt,
    score: 94,
    isSaved: true,
    tags: ["Date night", "Monochrome"],
  },
  {
    id: "look-2",
    title: "Soft power",
    style: "Old money",
    imageUrl: imageUrls.creamSweater,
    score: 91,
    isSaved: true,
    tags: ["Office", "Layered"],
  },
];

const trendingLooks = [
  ...savedLooks,
  {
    id: "look-3",
    title: "Weekend in Lisbon",
    style: "Relaxed tailoring",
    imageUrl: imageUrls.denimJacket,
    score: 89,
    isSaved: false,
    tags: ["Travel", "Casual"],
  },
  {
    id: "look-4",
    title: "After hours",
    style: "Modern minimal",
    imageUrl: imageUrls.blackTrousers,
    score: 96,
    isSaved: false,
    tags: ["Party", "Minimal"],
  },
];

let profile = {
  name: "Padmaja",
  styles: ["Minimal", "Casual", "Indo-Western"],
  colors: ["Black", "White", "Beige", "Blue"],
  occasions: ["College", "Casual", "Travel"],
  budget: "₹500–₹2,000",
};

function recommendedOutfit(overrides?: Partial<typeof outfitTemplate>) {
  return {
    ...outfitTemplate,
    id: `outfit-${Date.now()}`,
    ...overrides,
  };
}

const outfitTemplate = {
  id: "outfit-today",
  name: "The soft structure edit",
  style: "Modern minimal",
  occasion: "Everyday",
  weather: "24°C · Partly cloudy",
  totalPrice: 2798,
  score: 92,
  palette: ["#E9E0D1", "#151515", "#F8F5F0"],
  items: [
    {
      slot: "TOP",
      name: "Oatmeal knit sweater",
      imageUrl: imageUrls.creamSweater,
      price: 899,
    },
    {
      slot: "BOTTOM",
      name: "Tailored black trousers",
      imageUrl: imageUrls.blackTrousers,
      price: 999,
    },
    {
      slot: "SHOES",
      name: "Everyday white sneakers",
      imageUrl: imageUrls.whiteSneakers,
      price: 900,
    },
  ],
};

router.get("/dashboard", (_req, res): void => {
  res.json(
    GetDashboardResponse.parse({
      userName: profile.name,
      wardrobeCount: wardrobe.length + 12,
      savedLooksCount: savedLooks.length + 6,
      styleScore: 92,
      weather,
      recommendation: outfitTemplate,
      recentLooks: savedLooks.slice(0, 2),
    }),
  );
});

router.get("/wardrobe", (_req, res): void => {
  res.json(GetWardrobeResponse.parse(wardrobe));
});

router.post("/wardrobe", (req, res): void => {
  const parsed = CreateWardrobeItemBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const item = {
    id: `wardrobe-${Date.now()}`,
    ...parsed.data,
    wearCount: 0,
    isFavorite: false,
  };
  wardrobe = [item, ...wardrobe];
  res.status(201).json(CreateWardrobeItemResponse.parse(item));
});

router.delete("/wardrobe/:id", (req, res): void => {
  const params = DeleteWardrobeItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  wardrobe = wardrobe.filter((item) => item.id !== params.data.id);
  res.status(204).send(DeleteWardrobeItemResponse.parse(undefined));
});

router.post("/outfits/generate", (req, res): void => {
  const parsed = GenerateOutfitBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { occasion, style, weather: selectedWeather } = parsed.data;
  res.json(
    GenerateOutfitResponse.parse(
      recommendedOutfit({
        occasion,
        style,
        weather: selectedWeather,
        name: `${style} ${occasion} edit`,
      }),
    ),
  );
});

router.get("/looks/trending", (_req, res): void => {
  res.json(GetTrendingLooksResponse.parse(trendingLooks));
});

router.get("/looks/saved", (_req, res): void => {
  res.json(GetSavedLooksResponse.parse(savedLooks));
});

router.post("/looks/saved", (req, res): void => {
  const parsed = SaveLookBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const look = {
    id: `look-${Date.now()}`,
    ...parsed.data,
    isSaved: true,
  };
  savedLooks = [look, ...savedLooks];
  res.status(201).json(SaveLookResponse.parse(look));
});

router.delete("/looks/saved/:id", (req, res): void => {
  const params = DeleteSavedLookParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  savedLooks = savedLooks.filter((look) => look.id !== params.data.id);
  res.status(204).send(DeleteSavedLookResponse.parse(undefined));
});

router.get("/profile", (_req, res): void => {
  res.json(GetStyleProfileResponse.parse(profile));
});

router.patch("/profile", (req, res): void => {
  const parsed = UpdateStyleProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  profile = { ...profile, ...parsed.data };
  res.json(UpdateStyleProfileResponse.parse(profile));
});

router.post("/stylist/chat", (req, res): void => {
  const parsed = SendStylistMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const message = parsed.data.message.toLowerCase();
  const reply = message.includes("black")
    ? "Try the black piece with an oatmeal knit, white sneakers, and your soft structure tote. The warm neutral keeps the look light while the black anchors it."
    : message.includes("date")
      ? "For a date tonight, keep the silhouette relaxed but intentional: a clean white shirt, tailored black trousers, and one gold accent."
      : "Start with one piece you already love. I would pair it with a quiet neutral, a contrasting texture, and one personal detail so the look still feels like you.";

  res.json(
    SendStylistMessageResponse.parse({
      reply,
      suggestions: ["Style this for rain", "Keep it under ₹1,500", "Use only my wardrobe"],
    }),
  );
});

router.get("/weather/current", (_req, res): void => {
  res.json(GetCurrentWeatherResponse.parse(weather));
});

export default router;