import { Injectable } from '@nestjs/common';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import {
  ReorderCompetitionDto,
  UpdateCompetitionDto,
} from './dto/update-competition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Competition } from './entities/competition.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Discipline } from 'src/disciplines/entities/discipline.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Arena } from 'src/arenas/entities/arenas.entity';
import { CompetitionCategory } from 'src/competition_categories/entities/competition_category.entity';
import { RemoveCompetitionsDto } from './dto/remove-competitions.dto';
import { TournamentsArena } from 'src/tournaments_arenas/entities/tournaments_arena.entity';

@Injectable()
export class CompetitionsService {
  constructor(
    @InjectRepository(Competition)
    private competitionRepository: Repository<Competition>,

    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,

    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(CompetitionCategory)
    private ccRepository: Repository<CompetitionCategory>,

    @InjectRepository(TournamentsArena)
    private taRepository: Repository<TournamentsArena>,

    @InjectRepository(Arena)
    private arenaRepository: Repository<Arena>,
  ) {}

  async create(createCompetitionDto: CreateCompetitionDto) {
    const allCompetitions: Competition[] = [];
    const { tournamentTitle, arenas } = createCompetitionDto;

    let tournament = await this.tournamentRepository.findOne({
      where: {
        title: tournamentTitle,
      },
    });

    if (!tournament) {
      const tournamentsCount = await this.tournamentRepository.count();
      const tournamentOrder = tournamentsCount + 1;

      tournament = await this.tournamentRepository.save(
        this.tournamentRepository.create({
          title: tournamentTitle,
          order: tournamentOrder,
        }),
      );
    }

    for (const arenaItem of arenas) {
      const { arenaTitle, info } = arenaItem;

      let arena = await this.arenaRepository.findOne({
        where: {
          title: arenaTitle,
        },
      });

      if (!arena) {
        arena = await this.arenaRepository.save(
          this.arenaRepository.create({ title: arenaTitle }),
        );
      }

      const lastTA = await this.taRepository.findOne({
        where: { tournament: { id: tournament.id } },
        order: { order: 'DESC' },
      });

      const arenaOrder = lastTA ? lastTA.order + 1 : 1;

      const isExistTA = await this.taRepository.findOne({
        where: {
          arena: {
            id: arena.id,
          },
          tournament: {
            id: tournament.id,
          },
        },
      });
      if (!isExistTA) {
        await this.taRepository.save(
          this.taRepository.create({ arena, tournament, order: arenaOrder }),
        );
      }

      if (info && info.length > 0) {
        for (const infoItem of info) {
          const allCategories: Category[] = [];

          const { discipline: disciplineTitle, categories } = infoItem;

          let discipline = await this.disciplineRepository.findOne({
            where: {
              title: disciplineTitle,
            },
          });

          if (!discipline) {
            discipline = await this.disciplineRepository.save(
              this.disciplineRepository.create({ title: disciplineTitle }),
            );
          }

          if (categories && categories.length > 0) {
            for (const categoryItem of categories) {
              let category = await this.categoryRepository.findOne({
                where: {
                  title: categoryItem,
                },
              });

              if (!category) {
                category = await this.categoryRepository.save(
                  this.categoryRepository.create({ title: categoryItem }),
                );
              }
              allCategories.push(category);
            }
          }

          const competitionsByAll = await this.competitionRepository.find({
            where: {
              tournament: {
                id: tournament.id,
              },
              arena: {
                id: arena.id,
              },
              discipline: {
                title: discipline.title,
              },
            },
            relations: {
              categories: {
                category: true,
              },
            },
          });

          const sortedCategoryTitles = allCategories.map((c) => c.title).sort();

          const isCompetitonDuplicate = competitionsByAll.some(
            (competition) => {
              const categorieTitles = competition.categories
                ?.map((item) => item.category.title)
                .sort();

              if (
                !categorieTitles ||
                categorieTitles.length !== sortedCategoryTitles.length
              ) {
                return false;
              }

              return sortedCategoryTitles.every(
                (title, index) => title === categorieTitles[index],
              );
            },
          );

          if (isCompetitonDuplicate) continue;

          const competitionsByArena = await this.competitionRepository.find({
            where: {
              tournament: {
                id: tournament.id,
              },
              arena: {
                id: arena.id,
              },
            },
            order: {
              order: 'DESC',
            },
          });

          const competitionOrder =
            competitionsByArena.length > 0
              ? competitionsByArena[0].order + 1
              : 1;

          const competition = await this.competitionRepository.save(
            this.competitionRepository.create({
              tournament,
              arena,
              discipline,
              order: competitionOrder,
            }),
          );

          for (const category of allCategories) {
            const existing = await this.ccRepository.findOne({
              where: { category, competition },
            });
            if (!existing) {
              await this.ccRepository.save(
                this.ccRepository.create({ category, competition }),
              );
            }
          }

          allCompetitions.push(competition);
        }
      }
    }
    return allCompetitions;
  }

  /* async findAll(query: FindCompetitionsDto) {
    const { q: querySearch, limit, skip } = query;

    const [data, count] = await this.competitionRepository.findAndCount({
      take: limit,
      skip: skip,
      where: querySearch
        ? {
            title: ILike(`%${querySearch}%`),
          }
        : undefined,
    });
    return {
      data,
      count,
    };
  } */

  findOne(id: string) {
    return this.competitionRepository.findOneBy({ id });
  }

  update(id: string, updateCompetitionDto: UpdateCompetitionDto) {
    return this.competitionRepository.update(id, {
      isFinished: updateCompetitionDto.isFinished,
    });
  }

  async reorder(updateCompetitionDto: ReorderCompetitionDto) {
    const { items } = updateCompetitionDto;
    const entities: UpdateResult[] = [];
    for (const item of items) {
      const mutation = await this.competitionRepository.update(item.id, {
        order: item.order,
        tournament: {
          id: item.tournamentId,
        },
        arena: {
          id: item.arenaId,
        },
      });
      entities.push(mutation);
    }
    return entities;
  }

  removeMany(body: RemoveCompetitionsDto) {
    const { arena_id, tournament_id } = body;
    return this.competitionRepository.delete({
      arena: {
        id: arena_id,
      },
      tournament: {
        id: tournament_id,
      },
    });
  }

  remove(id: string) {
    return this.competitionRepository.delete({ id });
  }
}
